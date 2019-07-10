/**
 * 
 *      html-routes
 * 
 */

module.exports = _app => { 
    _app.get("/", (_req, _res) => {
        if (_req.session.loggedin) {
    
            _res.render("index", {loggedin: true});
        } else { 
            _res.render("index", {loggedin: false});
    
        }
    });
    
    
    
    _app.get('/loggedin', function (_req, _res) {
        console.log("here");
     
        _res.render("loggedin");
    });
};