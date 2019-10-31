



const Client = require('./index')

const client = new Client({
    puppeteer: { headless: false },
    session: {
        WABrowserId: '"qU5V5x/V2iTdfH5QdHc7yg=="',
        WASecretBundle:
            '{"key":"TVCj4p60J9nklQDp+hSmK+nvCVMHK2fwID9tpShGQVo=","encKey":"do3JhuI3JvkTAuTs4UNUbZHuHGjXA+UOopphm5un2b8=","macKey":"TVCj4p60J9nklQDp+hSmK+nvCVMHK2fwID9tpShGQVo="}',
        WAToken1: '"F+hVGpk5GwmSNh1bQYlPaffAL//Oc00Oj9C9VZqWlBQ="',
        WAToken2:
            '"1@RDZOZEmI8Yxi8m8qw3spzoNK/YqfI8JGLxzWSJ5jeVJVp8faNGDB6LXSuxiA1gvyFeSapmChrc6JfA=="'
    }


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
        client.sendMessageToID("6289506096398@c.us", `test ${time}`).then((r) => {
            console.log("sendMessageToID",r)
        })
        client.sendMessage("6289506096398@c.us", `test ${time}`).then((r) => {
            console.log("sendMessage",r)
        })
        client.getBatteryLevel().then((r) => {
            console.log("getBatteryLevel", r)
        })
        
        console.log("checkNumberStatus");
        let number = "6289506096398@c.us"
        client.checkNumberStatus(number).then((r) => {
            console.log("NumberStatus", r)
        })

    }, 2000);



    



});


client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

});

client.on('disconnected', () => {

    console.log('Client was logged out');
})



