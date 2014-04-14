angular.module('searchshop', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/searchshop', {templateUrl: 'searchshop/searchshop.tpl.html', controller : 'SearchShopCtrl' })
    })

    .controller('SearchShopCtrl', function ($scope, $http, $location) {

    });
