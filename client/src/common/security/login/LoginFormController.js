angular.module('security.login.form', [])

.controller('LoginFormController', ['$scope', '$modalInstance','security', function($scope, $modalInstance, security) {
  $scope.user = {};
  $scope.authError = null;

  $scope.login = function() {
    $scope.authError = null;


    security.login($scope.user.email, $scope.user.password, function(err) {
        console.log('err');
      if (err) {
        $scope.authError = err;
      }
    });
  };

  $scope.cancelLogin = function() {
    $modalInstance.dismiss();
  };
}]);
