'use strict';

const Base = require('./Base');

/**
 * Represents a Message on WhatsApp
 * @extends {Base}
 */
class Ack extends Base {
    constructor(client, data) {
        super(client);

        if(data) this._patch(data);
    }

    _patch(data) {
        this.id = data.id;
        this.ack = data.ack;
        switch (data.ack) {
            case 1:
        this.ackStatus = "Send" ;
                
                break;
            case 2:
        this.ackStatus = "Received" ;
                
                break;
            case 3:
        this.ackStatus = "Read" ;
                
                break;
        
            default:
                break;
        }
        this.chatId =data.id.fromMe ? data.to : data.from
        this.timestamp = data.t;

        return super._patch(data);
    }

}

module.exports = Ack;