angular.module('security.service', ['security.login','ui.bootstrap'])

.factory('security', ['$http', '$q', '$location', '$modal', function($http, $q, $location, $modal) {

  function redirect(url) {
    url = url || '/';
    $location.path(url);
  }

  var modalInstance;

  function openLoginDialog() {
      console.log('open')
      modalInstance = $modal.open({
          templateUrl: 'security/login/form.tpl.html',
          controller: 'LoginFormController'
      });
  }

  var service = {
    showLogin: function() {
      openLoginDialog();
    },

    login: function(email, password, callback) {
      $http.post('/login', {email: email, password: password})
          .success(function(data){
              service.currentUser = data.user;
              if ( service.isAuthenticated() ) {
                  modalInstance.close(true);
              }
          })
          .error(function(){
              callback('Invalid credentials');
          });
    },

    logout: function(redirectTo) {
      $http.post('/logout').then(function() {
        service.currentUser = null;
        redirect(redirectTo);
      });
    },

    requestCurrentUser: function() {
      if ( service.isAuthenticated() ) {
        return $q.when(service.currentUser);
      } else {
        return $http.get('/current-user').then(function(response) {
          service.currentUser = response.data.user;
          return service.currentUser;
        });
      }
    },

    currentUser: null,

    isAuthenticated: function(){
      return !!service.currentUser;
    },
    
    isAdmin: function() {
      return !!(service.currentUser && service.currentUser.admin);
    }
  };

  return service;
}]);
