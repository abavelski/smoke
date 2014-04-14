

var getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
  var deg2rad = function (deg) {
  	return deg * (Math.PI/180);
  }
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

module.exports = function(context) {
var app = context.app;    
var db = context.db;

app.get('/api/search/time', function(req, res) {
        var lat = req.query.lat || 55.6712673,
            lng = req.query.lng || 12.5608388,
            make = req.query.make, 
            service = req.query.service,
            date = req.query.date;
            
  db.collection('shop').find({ 'coords' :
       { $near :
          {
            $geometry : {
               type : "Point" ,
               coordinates : [parseFloat(lng), parseFloat(lat)] },
            $maxDistance : 50000
          }
       }
    }).toArray(function(err, shops){
      if (!err && shops && shops.length>0)  {
        for (var i=0;i<shops.length;i++) {
          shops[i].distance = Math.round(getDistanceFromLatLonInKm(lat, lng, shops[i].coords[1], shops[i].coords[0]) * 100) / 100; 
        }
      }
      res.json(shops);
  });
});

};