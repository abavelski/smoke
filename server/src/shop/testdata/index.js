var shops = require('./testShops');

module.exports = function(context) {
var app = context.app;    
var db = context.db;

app.post('/api/test/shops', function(req, res) {
         db.collection('shop').insert(shops, function(err){
         	if (err) {
         		res.json(500);
         	} else {
         		res.json(200);
         	}
         });
    });
};