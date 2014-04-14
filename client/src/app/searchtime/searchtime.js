
angular.module('searchtime', ['ngRoute', 'ui.bootstrap.typeahead', 'ui.bootstrap.datepicker', 'utils'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/searchtime', {templateUrl: 'searchtime/searchtime.tpl.html', controller : 'SearchTimeCtrl' })
            .when('/searchtime/results', {templateUrl: 'searchtime/results.tpl.html', controller : 'ResultsCtrl' })
    })

.controller('SearchTimeCtrl', function ($scope, $http, $location, Utils) {

var geocoder = new google.maps.Geocoder();
$scope.dt = new Date();
$scope.minDate = new Date();
$scope.makes = [];
$scope.services = Utils.SERVICES;
$scope.service=$scope.services[0];
$scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1,
    'show-weeks': false
  };

$http.get('/api/makes').then(function(res){
    $scope.makes = res.data;
	  $scope.make = $scope.makes[0];
    });

$scope.getLocation = function(val) {
    return $http.get('/autocomplete/'+val).then(function(res){
      return res.data;
    });
  };

$scope.search = function() {
  var lat, lng;
     geocoder.geocode( { 'address': $scope.addrSelected}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
      }
      $http.get('/api/search/time', {
        params: {
          lat: lat,
          lng: lng,
          make : $scope.make,
          service: $scope.service.code,
          date : $scope.dt
        }
      }).then(function(res) {
       Utils.searchResults=res.data;
       $location.path('/searchtime/results')
      });

     });
  }

  $scope.toggle = function($event) {
  	$event.preventDefault();
    $event.stopPropagation();
  	$scope.opened = !$scope.opened;
  };
})
// results controller
.controller('ResultsCtrl', function($scope, Utils){
  $scope.searchResults = Utils.searchResults;
  $scope.services = Utils.SERVICES;
  $scope.bla = '';
  $scope.toggle = function() {
    if ($scope.bla) {
      $scope.bla = '';
    } else {
      $scope.bla = 'active';
    }
  }



})

