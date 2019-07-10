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

// routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// express handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});