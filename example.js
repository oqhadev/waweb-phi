



const { Client } = require('./index')

const client = new Client({
    puppeteer: { headless: false },


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
        client.sendMessage("6289506096398@c.us", `test ${time}`)
    }, 2000);




});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

});

client.on('disconnected', () => {

    console.log('Client was logged out');
})



