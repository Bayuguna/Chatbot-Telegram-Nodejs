'use strict'

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController{
    handle($) {
        $.sendMessage("Ping Connection " + '/ping' + "\n" + "Username " + '/username' + "\n" + "Data Users " + '/data')
    }
}

module.exports = OtherwiseController;