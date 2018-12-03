'use strict';

const Telegram = require('telegram-node-bot');

class NameController extends Telegram.TelegramBaseController{
    /**
     * @param {Scope} $
     */
    handle($) {
        // console.log($.message.chat.id);    
        $.sendMessage($.message.chat.username);  
  
    }
}

module.exports = NameController;