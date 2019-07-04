/**
 *  
 *      server.js
 * 
 */

var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
var mysql = require("mysql");

app.listen(PORT, () => { 
    console.log("Listening on port: " + PORT);
});

// sql
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "logintest_db",
    port: 8889
});

connection.connect(_err => { 
    if (_err) {
        alert(_err);
        returnl;
    }
    
    console.log("connected as user id: " + connection.threadId);
});

app.get("/", (_req, _res) => { 
    _res.render("index");
});

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine" , "handlebars");
