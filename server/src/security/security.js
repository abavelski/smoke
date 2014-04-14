var express = require('express');
var passport = require('passport');
var MongoStrategy = require('./mongoStrategy');
var CalendarDao = require('../calendar/calendarDao');

var filterUser = function(user) {
    if (user) {
        return {
            user : {
                email: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    } else {
        return { user: null };
    }
};

var calendarDao = {};

var security = {
    initialize: function(db) {
        passport.use(new MongoStrategy(db));
        calendarDao = new CalendarDao(db);
    },

    canUpdateCalendar: function(req, res, next) {
        if (req.isAuthenticated()) {
            calendarDao.findCalendarById(req.params.id, function(err, calendar){
                if (err || !calendar) {
                    res.send(403);
                } else {
                    if(calendar.userId===req.user._id) {
                        next(req, res);
                    } else {
                        res.send(403);
                    }
                }
            });
        } else {
            res.send(401);
        }
    },

    authenticationRequired: function(req, res, next) {
        if (req.isAuthenticated()) {
            next(req, res);
        } else {
            res.send(401);
        }
    },

    sendCurrentUser: function(req, res) {
        res.json(200, filterUser(req.user));
    },

    login: function(req, res, next) {
        var authenticationFailed = function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(401);
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.json(filterUser(user));
            });
        }
        return passport.authenticate("mongo", authenticationFailed)(req, res, next);
    },

    logout: function(req, res) {
        req.logout();
        res.send(204);
    }
};

module.exports = security;