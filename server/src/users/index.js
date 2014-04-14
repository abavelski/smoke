var UsersDao = require('./usersDao');

module.exports = function(context) {
    var usersDao = new UsersDao(context.db);
    var createUser = function(req, res) {
        var user = req.body;
        user._id = user.email;
        delete user.email;
        usersDao.insertUser(user, function(err){
            if (err) {
                res.json(409, {error: "Not able to insert new user!"});
            }  else {
                res.send(201);
            }
        });
    }

    var getCalendar = function(req, res) {
        var userId = req.params.userid;
        if (req.user._id!==userId) {
            res.json(403, "unable to retrieve calendars for the user");
        } else {
            usersDao.findCalendarsByUser(userId, function(err, calendars) {
               if (err) {
                   res.json(500, "internal error")
               } else {
                   res.json(calendars);
               }
            });
        }


    }
    var app = context.app,
        security = context.security;

    app.post('/users', createUser);

    app.post('/login', security.login);
    app.post('/logout', security.logout);
    app.get('/authenticated-user', function(req, res) {
        security.authenticationRequired(req, res, security.sendCurrentUser);
    });
    // Retrieve the current user
    app.get('/current-user', security.sendCurrentUser);
    app.get('/users/:userid/calendars', function(req, res){
        security.authenticationRequired(req, res, getCalendar);
    });

    /*
     curl -X POST -H "Content-Type: application/json" -d '{"email":"bbb","password":"123"}' http://localhost:8080/login
     */

};