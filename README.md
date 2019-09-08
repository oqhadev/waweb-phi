# WAWEB-phi
![npm](https://img.shields.io/npm/v/waweb-phi)  ![NPM](https://img.shields.io/npm/l/waweb-phi) ![GitHub last commit](https://img.shields.io/github/last-commit/oqhadev/waweb-phi)

WAWEB-phi is library for controlling whatsapp web for nodejs,
inspired from [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) and WAPI.js


What is the difference? This library uses wapi.js which contains features such as sending pictures, sending to numbers that are not in the contact list
and many more

## Installation
NPM
```bash
npm install waweb-phi 
```
YARN
```bash
yarn add waweb-phi 
```

## Usage

```js
const wa = require('waweb-phi')

const client = new wa({
    puppeteer: { headless: false }

});


client.initialize();
```



## Example
```js
const wa = require('waweb-phi')

const client = new wa({
    puppeteer: { headless: false }

});


client.initialize();


client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);

});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);

});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);


})

client.on('ready', () => {
    console.log('READY');




    setTimeout(() => {
        console.log("Send Message");

        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        client.sendMessage("62895xxxxxxxx@c.us", `test ${time}`)
    }, 2000);




});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

});

client.on('disconnected', () => {

    console.log('Client was logged out');
})

```

## Todo
- [x] SendMessageToID (send message to who not in contact list)
- [ ] Implement all WAPI.js Function
- [ ] event on getBroadcast
- [ ] and more



## Legal
This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries. This is an independent and unofficial software. Use at your own risk. Commercial use of this code/repo is strictly prohibited.

## License
[APACHE v2](https://www.apache.org/licenses/LICENSE-2.0.txt)



made with 💗 