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

MySqlConnection.connect((err)=>{
    if(!err)
    console.log('DB Connection Success')
    else
    console.log("Connection Error" + JSON.stringify(err, undefined,200))
})

app.get('/mahasiswa',(req,res)=>{
    MySqlConnection.query("SELECT * FROM tb_mahasiswa where id = 1" , (err,rows,field)=>{
     if(!err)
     res.send(rows);
    else
    console.log(err)
    
    })
})

 //rest api to create a new record into mysql database
 app.post('/inbox', function (req, res) {
    var postData  = req.body;
    MySqlConnection.query('INSERT INTO tb_inbox SET ?', postData, function (error, results, fields) {
        if (error) throw error;
	    res.end(JSON.stringify(postData));
     });
 });