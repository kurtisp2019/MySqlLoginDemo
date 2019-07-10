/**
 * 
 *      user-controller.js
 * 
 */
var connection = require("../config/connection");

module.exports = {
    selectUser: (_email, _password, _callBack) => {

        connection.query('SELECT * FROM ?? WHERE email = ? AND password = ?', ["users", _email, _password], function (_err, _results, _fields) {

            if (_err) { console.log(_err); return; }
            _callBack(_results, _fields);
        });
    },

    createUser: (_email, _password, _firstName, _lastName, _callback) => {

        var sql = "INSERT INTO `users`(`first_name`,`last_name`,`email`, `password`) VALUES ('" + _firstName + "','" + _lastName + "','" + _email + "','" + _password + "')";
        var userCreated = true;
        connection.query(sql, function (_err, _result) {

            if (_err) {
                console.log(_err);
                alert("user unable to be created");
                 userCreated = false;
                _callback(userCreated);
                return;
            }

            console.log("Succesfully! Your account has been created.");
            _callback(userCreated);
        });
    },
    deleteUser: (_email, _password) => {

    }
};
