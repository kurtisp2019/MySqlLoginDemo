var mysql = require("mysql");

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

module.exports = connection;