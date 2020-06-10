# WAWEB-phi
![npm](https://img.shields.io/npm/v/waweb-phi)  ![NPM](https://img.shields.io/npm/l/waweb-phi) ![GitHub last commit](https://img.shields.io/github/last-commit/oqhadev/waweb-phi)

WAWEB-phi is library for controlling whatsapp web for nodejs,
inspired from [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) and WAPI.js


  


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
    puppeteer: { headless: false }, //change it to true if u want hidding the chrome/
    authTimeout: 30000,
   
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
        client.sendMessage("628950609xxxx@c.us", `test`).then((r) => {
            console.log("sendMessage",r)
        })

});


client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

});

client.on('disconnected', () => {

    console.log('Client was logged out');
})


```

##### for more detail example, see example.js



## Update
- 27/03/2020 (v0.1.18) fix Update
- 27/03/2020 (v0.1.16) Update 
- 06/03/2020 (v0.1.15) add ack status (send,received,read) 
- 19/02/2020 (v0.1.14) Add SendImageToID + fix SendImage + add sendSeen + add deviceInfo 
- 27/01/2020 (v0.1.12 > v0.1.13) add authTimeout option + change default authTimeout value from 5000ms to 10000ms , for detail check example.js
- 17/01/2020 (v0.1.11) fix selector qr/qrvalue/keep phoneimage update 



## Legal
This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries. This is an independent and unofficial software. Use at your own risk. Commercial use of this code/repo is strictly prohibited.

## License
[APACHE v2](https://www.apache.org/licenses/LICENSE-2.0.txt)



made with 💗 