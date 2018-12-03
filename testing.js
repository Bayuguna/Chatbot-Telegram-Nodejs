const TelegramBot = require('node-telegram-bot-api');
const token = '744997719:AAEM8E9QZlDxNZnpP0I-73JOTK1Q-WBa7aA';
const bot = new TelegramBot(token, {polling: true});

//DATABASE Connection
const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));


var MySqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'matchabot'
});

app.listen(3000,()=>console.log('Express is running at port 3000'));

// MySqlConnection.connect((err)=>{
//     if(!err)
//     console.log('DB Connection Success')
//     else
//     console.log("Connection Error" + JSON.stringify(err, undefined,200))
// })


bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome " + msg.chat.first_name, {
    "reply_markup": {
        "keyboard": [["Hi", "Bye"],   ["Data", "NIM"]]
        }
    });
});

bot.on('message', (msg) => {    
        var Hi = "hi";  
        if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id,"What Can I Help You, Mr/Mrs " + msg.chat.first_name +" "+ msg.chat.last_name);
        } 

        var bye = "bye";
        if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
        } 

        // var Data = "data";  
        // if (msg.text.toString().toLowerCase().indexOf(Data) === 0) {
        // bot.sendMessage(msg.chat.id, "ID : " + msg.chat.id
        // +"\n" + "First Name : " + msg.chat.first_name
        // +"\n" + "Last Name : " + msg.chat.last_name
        // +"\n" + "Username : " + msg.chat.username);
        // } 

        var Data = "data";  
        var filePath = "E:\hai.txt";
        if (msg.text.toString().toLowerCase().indexOf(Data) === 0) {
            bot.sendDocument(msg.chat.id, filePath);
        }

        MySqlConnection.connect(function(err) {
            var inbox = ("INSERT INTO tb_inbox (chat_id, message,date) VALUES ?");
            var date = new Date().toISOString()
            var values = [[msg.chat.id, msg.text, Date.now(date)]];
            MySqlConnection.query(inbox,[values], function (err, result) {
                if (err) throw err;
                console.log(values);
            });

            var outbox = ("INSERT INTO tb_outbox (chat_id, message, status, date) VALUES ?");
            var values2 = [[msg.chat.id, msg.text ,'1', date]];
            MySqlConnection.query(outbox,[values2], function(err,result){
                if (err) throw err;
                console.log(msg);
            })

            var NIM = "nim";
            var nim_insert = msg.text
            var nim = ("SELECT * FROM tb_mahasiswa WHERE nim = " + msg.text);
            if (msg.text.toString().toLowerCase().includes(NIM)) {
                bot.sendMessage(msg.chat.id, "Please insert NIM");


            }  else if(msg.text.toString().includes(msg.text)){
                // var values3 = [[msg.text]];
                MySqlConnection.query(nim, function(err,result,fields){
                    if (err) throw err;
                    // console.log(result);
                    Object.keys(result).forEach(function(key){
                        var row = result[key];
                        console.log(row.nama)
                        bot.sendMessage(msg.chat.id, "Nama : " + row.nama + "\n" + "No Telp : " + row.telp);
                    })
                })
                }
          });
        });