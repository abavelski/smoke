"use strict";
var CalendarDao = require('./calendarDao');

function Calendar (db) {

    var calendarDao = new CalendarDao(db);

    this.getCalendars = function(req, res) {
        calendarDao.findAllCalendars(function(err, calendars) {
            handleGetResponse(err, calendars, res);
        });
    };

    this.getEvents = function(req, res) {
        var id = req.params.id;
        calendarDao.findAllEventsForCalendar(id, function(err, events){
            handleGetResponse(err, events, res);
        });
    };

    this.getCalendar = function(req, res) {
        var id = req.params.id;
        calendarDao.findCalendarById(id, function(err, calendar) {
            handleGetResponse(err, calendar, res);
        });
    };

    this.createCalendar = function(req, res) {
        var calendar = req.body;
        console.log(calendar);
        if (!calendar._id) {
            res.json(400, "calendar id is not specified");
            return;
        }
        calendarDao.insertCalendar(calendar, function(err){
            handleUpdateOrInsert(err, res);
        });
    };

    this.updateCalendar = function(req, res) {
        var id = req.params.id;
        calendarDao.updateCalendar(id, req.body, function(err) {
            handleUpdateOrInsert(err, res);
        });
    };

    this.updateEvent = function(req, res) {
        var event = req.body;
        var eventId = req.params.eventid;
        var calendarId = req.params.id;

        calendarDao.findCalendarById(calendarId, function(err, calendar) {
            if (err || !calendar) {
                res.json(400, "calendar not found");
            } else {
                event.calendarId = calendarId;
                calendarDao.updateEvent(eventId, event, function(err) {
                    handleUpdateOrInsert(err, res);
                });
            }
        });

        calendarDao.updateEvent(eventId, event, function(err) {
            handleUpdateOrInsert(err, res);
        });
    };

    this.deleteCalendar = function(req, res) {
      var id = req.params.id;
      calendarDao.deleteCalendar(id, function(err, nr){
        handleDelete(err, nr, res);
      });
    };

    this.deleteEvent = function(req, res) {
        calendarDao.findCalendarById(req.params.id, function(err, calendar){
            if (err || !calendar) {
                res.json(400, "calendar not found");
            } else {
                calendarDao.deleteEvent(req.params.eventid, handleDelete);
            }
        });
    };

    this.createEvents = function(req, res) {
        var prepareEvents = function(arr, next) {
            calendarDao.findCalendarById(req.params.id, function(err, calendar){
                if (err || !calendar) {
                    res.json(400, "calendar not found");
                } else {
                    for (var i = 0; i < events.length; i++) {
                        events[i].calendarId=req.params.id;
                    };
                    next();
                }
            });
        };

        var events = [];
        if (req.body instanceof Array) {
            events = req.body;
        } else {
            events.push(req.body);
        }

        prepareEvents(events, function(){
            calendarDao.insertEvents(events, function(err, insRes) {
                if(err) {
                    res.json(500, "insert failed");
                } else {
                    res.json(insRes);
                }
            });
        });
    };

    var handleDelete = function(err, nr, res) {
        if(err) {
            res.json(503, "internal error");
        } else {
            if (nr===0) {
                res.json(404, "not found");
            } else  {
                res.json(200, "deleted");
            }
        }
    };

    var handleUpdateOrInsert = function(err, res)  {
        if (err) {
            res.json(500, {error: "not able to update/insert"});
        }  else {
            res.send(201);
        }
    };

    var handleGetResponse = function(err, obj, res) {
        if(err) {
            res.json(500, "internal error");
        } else if(obj) {
            res.json(200, obj);
        } else {
            res.json(404, "object not found");
        }

    };
}

module.exports = Calendar;