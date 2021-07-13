'use strict';

exports.WhatsWebURL = 'https://web.whatsapp.com/'

exports.UserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36';

exports.DefaultOptions = {
    puppeteer: {
        headless: true
    },
    session: false,
    authTimeout: 10000,
}
exports.Selectors = {
    KEEP_PHONE_CONNECTED_IMG_SELECTOR: '._1lPgH',
    QR_CONTAINER_SELECTOR: '._25pwu',
    QR_VALUE_SELECTOR: '._2UwZ_',
}


exports.Events = {
    AUTHENTICATED: 'authenticated',
    AUTHENTICATION_FAILURE: 'auth_failure',
    READY: 'ready',
    MESSAGE_CREATE: 'message',
    QR_RECEIVED: 'qr',
    ACK: 'ack',
    DISCONNECTED: 'disconnected'
}

