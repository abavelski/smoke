angular.module('register', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/register', {templateUrl: 'register/registerUser.tpl.html', controller : 'RegisterUserCtrl' })
            .when('/register/ok', {templateUrl: 'register/registerOk.tpl.html' });
    })

    .controller('RegisterUserCtrl', function ($scope, $http, $location) {
        $scope.user = {};

        $scope.register = function() {
            console.log($scope.user);
            $http.post('/users', $scope.user).success(function() {
                console.log('registered');
                $location.path('/register/ok');
            }).error(function(err) {
                    console.log(err);
                    //notifications.pushNotification({type:"error", message: err.error})
                });
        };
    });

