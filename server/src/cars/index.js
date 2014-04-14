
module.exports = function(context) {
var app = context.app;    

app.get('/api/makes', function(req, res) {
        var makes = ['Renault', 'Peugeot', 'Citroen', 'BMW', 'Mercedes-Benz', 'Opel', 'Porsche', 'Volkswagen', 
        'Fiat', 'Honda', 'Suzuki', 'Lexus', 'Mazda', 'Subaru'];
         res.json(makes);
    });


};