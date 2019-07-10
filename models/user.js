/**
 * 
 *      user.js
 * 
 */

var User = function(_email, _password, _firstName, _lastName){ 
    this.email = _email;
    this.password = _password;
    this.firstName = _firstName;
    this.lastName = _lastName;
}

module.exports = User;