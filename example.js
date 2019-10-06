



const Client = require('./index')

const client = new Client({
    puppeteer: { headless: false },
    session: {
        WABrowserId: '"4Lqks4vMVfP7BQ9Ryzkk5g=="',
        WASecretBundle:
            '{"key":"SW1da4Zmd3ibX6+w6mOpvYDyElKDtCoeP11oy8i6rQg=","encKey":"UBg1axWojLiY/fE+fGpeLnNp1Q0gZx4ajMmSAGwLWVo=","macKey":"SW1da4Zmd3ibX6+w6mOpvYDyElKDtCoeP11oy8i6rQg="}',
        WAToken1: '"Y0DzO730Cq5/nVNtNPTC4Np9/Vha+QDU0VNNUV+UIUM="',
        WAToken2:
            '"1@QX5gj+ucOgU4RO/MrRa7JCPArc2DPRJo0GOkPw4g5L/FmePukYKee9lEePG11u2AJm1y4gdDHxCzDA=="'
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
        client.sendMessage("62895060963988@c.us", `test ${time}`).then((r) => {
            console.log("sendMessage",r)
        })
    }, 2000);



});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

});

client.on('disconnected', () => {

    console.log('Client was logged out');
})



