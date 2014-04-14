var ObjectID = require('mongodb').ObjectID;

function CalendarDao(db) {
    "use strict";


    this.insertCalendar = function (calendar, next) {
        db.collection('calendar').insert(calendar, next);
    };
    this.updateCalendar = function (id, calendar, next) {
        db.collection('calendar').update({_id:id}, calendar, next);
    };
    this.findAllCalendars = function(next) {
        db.collection('calendar').find().toArray(next);
    };
    this.findCalendarById = function(id, next) {
        db.collection('calendar').findOne({_id: id}, next);
    };
    this.deleteCalendar = function(id, next) {
      db.collection('calendar').remove({_id:id}, {w:1}, next);
    };
    this.insertEvents = function (events, next) {
        db.collection('event').insert(events, next);
    };
    this.updateEvent = function (eventid, event, next) {
        db.collection('event').update({_id:new ObjectID.createFromHexString(eventid)}, event, next);
    };
    this.deleteEvent = function(id, next) {
        db.collection('event').remove({_id:new ObjectID.createFromHexString(id)}, {w:1}, next);
    };

    this.findAllEventsForCalendar = function(id, next) {
        db.collection('event').find({calendarId:id}).toArray(next);
    };

}

module.exports = CalendarDao;