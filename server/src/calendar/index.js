var Calendar = require('./calendar');

module.exports = function(context) {
    var security = context.security;
    var app = context.app;
    var handler = new Calendar(context.db);
    app.get('/calendars', handler.getCalendars);
    app.get('/calendars/:id', handler.getCalendar);
    app.post('/calendars', function(req, res) {
        security.authenticationRequired(req, res, handler.createCalendar);
    });
    app.put('/calendars/:id', function(req, res) {
        security.canUpdateCalendar(req, res, handler.updateCalendar);
    });
    app.delete('/calendars/:id', function(req, res){
        security.canUpdateCalendar(req, res, handler.deleteCalendar);
    });

    app.post('/calendars/:id/events', function(req, res) {
        security.canUpdateCalendar(req, res, handler.createEvents);
    });
    app.put('/calendars/:id/events/:eventid', function(req, res) {
        security.canUpdateCalendar(req, res, handler.updateEvent);
    });
    app.delete('/calendars/:id/events/:eventid', function(req, res) {
        security.canUpdateCalendar(req, res, handler.deleteEvent);
    });
    app.get('/calendars/:id/events', handler.getEvents);

    //app.pos('/calendars/:id/events/:eventid/book', handler.book);
    //app.pos('/calendars/:id/events/:eventid/cancel', handler.cancel);

};