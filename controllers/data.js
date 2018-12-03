'use strict';

const Telegram = require('telegram-node-bot');

class DataController extends Telegram.TelegramBaseController{
    /**
     * @param {Scope} $
     */
    handle($) {
        // console.log($.message.chat.id);    
        $.sendMessage(["ID : " + $.message.chat.id
    +"\n" + "First Name : " + $.message.chat.firstName
    +"\n" + "Last Name : " + $.message.chat.lastName
    +"\n" + "Username : " + $.message.chat.username]);
    }
}

module.exports = DataController;