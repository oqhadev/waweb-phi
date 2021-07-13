'use strict';


const EventEmitter = require('events');
const puppeteer = require('puppeteer');
const Util = require('./util/Util');
const { WhatsWebURL, UserAgent, DefaultOptions, Events, Selectors } = require('./util/Constants');
const Message = require('./structures/Message')
const Ack = require('./structures/Ack')
const path = require("path");

/**
 * Starting point for interacting with the WhatsApp Web API
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
    constructor(options = {}) {
        super();

        this.options = Util.mergeDefault(DefaultOptions, options);

        this.pupBrowser = null;
        this.pupPage = null;
    }

    /**
     * Sets up events and requirements, kicks off authentication request
     */
    async initialize() {
        const browser = await puppeteer.launch(this.options.puppeteer);
        const page = await browser.newPage();

        page.setUserAgent(UserAgent);
        if (this.options.session) {
            await page.evaluateOnNewDocument(
                session => {
                    localStorage.clear();
                    localStorage.setItem("WABrowserId", session.WABrowserId);
                    localStorage.setItem("WASecretBundle", session.WASecretBundle);
                    localStorage.setItem("WAToken1", session.WAToken1);
                    localStorage.setItem("WAToken2", session.WAToken2);
                }, this.options.session);
        }
        await page.goto(WhatsWebURL, { waitUntil: 'networkidle0' });

        const KEEP_PHONE_CONNECTED_IMG_SELECTOR = Selectors.KEEP_PHONE_CONNECTED_IMG_SELECTOR;
        if (this.options.session) {
            // Check if session restore was successfull 
            try {
                await page.waitForSelector(KEEP_PHONE_CONNECTED_IMG_SELECTOR, { timeout: this.options.authTimeout });
            } catch (err) {
                if (err.name === 'TimeoutError') {
                    this.emit(Events.AUTHENTICATION_FAILURE, 'Unable to log in. Are the session details valid?');
                    browser.close();

                    return;
                }

                throw err;
            }

        } else {
            // Wait for QR Code

            const QR_CONTAINER_SELECTOR = Selectors.QR_CONTAINER_SELECTOR;
            const QR_VALUE_SELECTOR = Selectors.QR_VALUE_SELECTOR;

            await page.waitForSelector(QR_CONTAINER_SELECTOR);

            setTimeout(async () => {

                const qr = await page.$eval(QR_VALUE_SELECTOR, node => node.getAttribute('data-ref'));
                this.emit(Events.QR_RECEIVED, qr);
            }, 1000);


            // Wait for code scan
            await page.waitForSelector(KEEP_PHONE_CONNECTED_IMG_SELECTOR, { timeout: 0 });
        }



        await page.addScriptTag({ path: require.resolve(path.join(__dirname, "util/WAPI.js")) });







        // Get session tokens
        const localStorage = JSON.parse(await page.evaluate(() => {
            return JSON.stringify(window.localStorage);
        }));

        const session = {
            WABrowserId: localStorage.WABrowserId,
            WASecretBundle: localStorage.WASecretBundle,
            WAToken1: localStorage.WAToken1,
            WAToken2: localStorage.WAToken2
        }
        this.emit(Events.AUTHENTICATED, session);


        await page.exposeFunction('onAck', data => {
            if (!data.id.fromMe && data.isNewMsg) return;

            this.emit(Events.ACK, new Ack(this, data));
        });
        await page.exposeFunction('onAddMessageEvent', msg => {
            if (msg.id.fromMe || !msg.isNewMsg) return;
            this.emit(Events.MESSAGE_CREATE, new Message(this, msg));
        });

        await page.exposeFunction('onConnectionChangedEvent', (conn, connected) => {
            if (!connected) {
                this.emit(Events.DISCONNECTED);
                this.destroy();
            }
        })

        await page.evaluate(() => {
            Store.Msg.on('add', onAddMessageEvent);
            Store.Msg.on("change:ack", onAck);
            Store.Conn.on('change:connected', onConnectionChangedEvent);
        })

        this.pupBrowser = browser;
        this.pupPage = page;

        this.emit(Events.READY);
    }
    async destroy() {
        await this.pupBrowser.close();

    }

    /**
     * Send a message to a specific chatId
     * @param {string} chatId
     * @param {string} message 
     */
    async sendMessage(chatId, message, data) {
        return this.sendMessageToID(chatId, message, data)
    }

    async getBatteryLevel() {

        let batLevel = await this.pupPage.evaluate(() => {
            return WAPI.getBatteryLevel();
        })
        return batLevel
    }
    async sendMessageToID(chatId, message, data) {

        try {

            let status = await this.pupPage.evaluate((chatId, message) => {
                return WAPI.sendMessageToID(chatId, message);
            }, chatId, message)


            return {
                status: status,
                data: data
            }
        } catch (error) {
            return {
                status: false,
                data: data
            }

        }

    }
    async sendAttachToID(base64file, caption, filename, chatId, data) {

        try {

            let status = await this.pupPage.evaluate((base64file, caption, filename, chatId) => {
                return WAPI.sendImageToID(base64file, chatId, filename, caption);
            }, base64file, caption, filename, chatId)


            return {
                status: status,
                data: data
            }
        } catch (error) {
            return {
                status: false,
                data: data
            }

        }

    }

    async sendAttach(base64file, caption, filename, chatId, data) {
        return this.sendAttachToID(base64file, caption, filename, chatId, data);

    }

    async deviceInfo() {
        return await this.pupPage.evaluate(() => {
            return Store.Conn.phone;

        })
    }
    async myNumber() {
        return await this.pupPage.evaluate(() => {
            return Store.Conn.wid.user;

        })
    }
    async sendSeen(chatId) {
        await this.pupPage.evaluate((chatId) => {
            return WAPI.sendSeen(chatId);
        }, chatId)
        return true;
    }
    async checkNumberStatus(id, data) {

        try {
            let status = await this.pupPage.evaluate((id) => {
                return WAPI.checkNumberStatus(id, function (a) {
                    return a;
                });
            }, id)


            return {
                status: status,
            }
        } catch (error) {
            return {
                status: false,
            }

        }

    }

}

module.exports = Client;