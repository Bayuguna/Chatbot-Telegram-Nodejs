'use strict'

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram('744997719:AAEM8E9QZlDxNZnpP0I-73JOTK1Q-WBa7aA' , {
    workers: 1
});

const PingController = require('./controllers/ping')
,NameController = require('./controllers/name')
,DataController = require('./controllers/data')
, OtherwiseController = require('./controllers/otherwise');

tg.router.when(new Telegram.TextCommand('/ping', 'pingCommand'), new PingController())
        .otherwise(new OtherwiseController());

tg.router.when(new Telegram.TextCommand('/username'), new NameController())
        .otherwise(new OtherwiseController());

tg.router.when(new Telegram.TextCommand('/data'), new DataController())
        .otherwise(new OtherwiseController());