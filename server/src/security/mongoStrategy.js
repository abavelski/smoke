var util = require('util');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UsersDao = require('../users/usersDao');

function MongoDBStrategy(db) {
    this.db = db;

    LocalStrategy.call(this, { usernameField: 'email' }, this.verifyUser.bind(this));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(this.get.bind(this));
    this.name = "mongo";
}

util.inherits(MongoDBStrategy, LocalStrategy);


MongoDBStrategy.prototype.get = function(id, done) {
    var usersDao = new UsersDao(this.db);
    usersDao.findUserById(id, done);
};

MongoDBStrategy.prototype.findByEmail = function(email, done) {
    var usersDao = new UsersDao(this.db);
    usersDao.findUserById(email, done);
};

MongoDBStrategy.prototype.verifyUser = function(email, password, done) {
    this.findByEmail(email, function(err, user) {
        if (!err && user) {
            if (user.password !== password) {
                user = null;
            }
        }
        done(err, user);
    });
};

module.exports = MongoDBStrategy;
