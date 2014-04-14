var express = require('express'),
    http = require('http'),
    mongoClient = require('mongodb').MongoClient,
    config = require('./config'),
    calendar = require('./calendar'),
    users = require('./users'),
    autocomplete = require('./autocomplete'),
    cars = require('./cars'),
    testdata = require('./shop/testdata'),
    search = require('./search'),
    passport = require('passport'),
    app = express();
var security = require('./security/security');


mongoClient.connect(process.env.MONGOLAB_URI || config.mongo.dbUrl, function(err, db) {
    if(err) {
        throw err;
    }
    
    app.use(express.logger())
       .use(express.static(config.server.staticFolder))
       .use(express.cookieParser())
       .use(express.bodyParser())
       .use(express.session({ secret: 'secret' }))
       .use(passport.initialize())
       .use(passport.session());

    security.initialize(db);


    var server = http.createServer(app);
    server.listen(process.env.PORT || 8080);
    console.log('Express server started.');

    var context = {
                   app : app,
                   db: db,
                   security: security,
                   config : config
    };

    autocomplete(context);
    calendar(context);
    users(context);
    cars(context);
    search(context);
    testdata(context);
});