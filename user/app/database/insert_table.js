var mysql = require('mysql');
const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (id, username, firstName, lastName, phone, password) VALUES (1,'dainq','Ngo', 'Quang Dai', '0335472717', '123456')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    var sql1 = "INSERT INTO users (id,username, firstName, lastName, phone, password) VALUES (2,'NgoQuangDai','Dai','Ngo Quang', '0940943875', '123456')";
    connection.query(sql1, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    var sql2 = "INSERT INTO users (id,username, firstName, lastName, phone, password) VALUES (3,'FPT-APTECH', 'APTECH','FPT','0683563756', '123456')";
    connection.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

});