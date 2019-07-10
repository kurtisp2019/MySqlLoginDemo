/**
 * 
 *      api-routes
 * 
 */

var userCont = require("../controllers/user-controller");

module.exports = _app => {

    // register
    _app.post("/register", (_req, _res) => {


        var post = _req.body;
        var email = post.email;
        var pass = post.password;
        var fname = post.firstName;
        var lname = post.lastName;

        //
        userCont.createUser(email, pass, fname, lname, _userCreated => { 

            _res.json(_userCreated).end();
        });
    });

    // logout
    _app.post("/logout", (_req, _res) => {
    
        _req.session.destroy(_err => {
            if (_err) {
                console.log(_err);
                _res.json(false).end();
            }
            console.log("session ended");
            _res.json(true).end();
        });

 
    });

    // login
    _app.post("/login", (_req, _res) => {
        var email = _req.body.email;
        var password = _req.body.password;
        if (email && password) {
            userCont.selectUser(email, password, function (_results, _fields) { 
                if (_results.length > 0) {
                    _req.session.loggedin = true;
                    _req.session.email = email;
                    _req.session.userId = _results[0].id;
                    console.log("you have logged in as id: " + _results[0].id);
                    // _res.redirect('/loggedin');
                } else {
                    console.log('Incorrect Username and/or Password!');
                    _res.json({loggedin: true}).end();
                }
                _res.json({loggedin: true}).end();
            });
           
        } else {
            console.log('Please enter Username and Password!');
            _res.json({loggedin: false}).end();
        }
    });
};