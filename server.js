/**
 *  
 *      server.js
 * 
 */

var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000;
var path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
var mysql = require("mysql");

// session 
var session = require("express-session");
app.use(session({
    key: 'user_sid',
    secret: 'itsasecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

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


// routes
app.get("/", (_req, _res) => {
    if (_req.session.loggedin) {

        _res.render("index", {loggedin: true});
    } else { 
        _res.render("index", {loggedin: false});

    }
});

app.post("/register", (_req, _res) => {

    var post = _req.body;
    var email = post.email;
    var pass = post.password;
    var fname = post.firstName;
    var lname = post.lastName;

    var sql = "INSERT INTO `users`(`first_name`,`last_name`,`email`, `password`) VALUES ('" + fname + "','" + lname + "','" + email + "','" + pass + "')";

    connection.query(sql, function (_err, result) {

        if (_err)
            console.log(_err);

        console.log("Succesfully! Your account has been created.");
        _res.status(200).end();
    });

});

app.post("/logout", (_req, _res) => {
    
    _req.session.destroy(_err => { 
        if (_err) {
            console.log(_err);
            _res.status(500).end();
        }
        console.log("session ended");
        _res.status(200).end();
    });

 
});

app.post("/login", (_req, _res) => {
   	var email = _req.body.email;
	var password = _req.body.password;
	if (email && password) {
        connection.query('SELECT * FROM ?? WHERE email = ? AND password = ?', ["users", email, password], function (_err, results, fields) {
            if (_err) { console.log(_err); return;}

			if (results.length > 0) {
				_req.session.loggedin = true;
                _req.session.email = email;
                _req.session.userId = results[0].id;
                console.log("you have logged in as id: " + results[0].id);
				// _res.redirect('/loggedin');
			} else {
				_res.send('Incorrect Username and/or Password!');
			}			
			_res.end();
		});
	} else {
		_res.send('Please enter Username and Password!');
		_res.end();
	}
});

app.get('/loggedin', function (_req, _res) {
    console.log("here");
	if (_req.session.loggedin) {
		_res.send('Welcome back, ' + _req.session.email + '!');
	} else {
		_res.send('Please login to view this page!');
	}
	_res.render("loggedin");
});

// express handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});