function onGoogleReady() {
  angular.bootstrap(document, ['app']);
}

angular.module('app', [ 'templates.app', 'templates.common', 'ngRoute', 'security', 'searchtime', 'searchshop'])
    .controller('AppCtrl', ['$scope', function($scope) {

}])

.controller('HeaderCtrl', ['$scope', '$location', 'security', function ($scope, $location, security) {


    $location.path('/searchtime');
    
    $scope.isActive = function(str){ return $location.path().search(str)>-1; };

}]);
