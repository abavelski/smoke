var https = require('https');


module.exports = function(context) {
    var app = context.app;
    var apiKey = context.config.google.apiKey;



    var getData = function(str, callback) {
        var url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+
            str+'&types=geocode&sensor=true&key='+apiKey+'&components=country:dk';

        https.get(url, function(res) {
            var data = "";
            res.on('data', function(chunk){
                data+=chunk;
            });
            res.on('end', function() {
                callback(JSON.parse(data));
            });
        });

    };

    app.get('/autocomplete/:query', function(req, res) {
         getData(req.params.query, function(data) {
             var result = [];
             for (var i=0;i<data.predictions.length; i++) {
                 result.push(data.predictions[i].description)
             }
             res.json(result);

         });
    });


};