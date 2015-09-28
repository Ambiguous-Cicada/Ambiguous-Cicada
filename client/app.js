angular.module('kwiki', [
  'kwiki.load',
  'kwiki.auth',
  'ngRoute',
  'kwiki.chat'
  ])
.config(function ($routeProvider, $window, $location) {

  var checkAuth = function (success, failure) {
    failure = failure || '/login';
    return {
      'check' : function ( ) {
        if($window.localStorage.getItem('com.kwiki')){
          $location.path(success);
        } else {
          $location.path(failure);
        }
      }
    };
  };

  $routeProvider
    .when('/loading', {
      templateUrl: 'loading.html',
      resolve: checkAuth('/loading'),
      controller: 'LoadController'
    })
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'userControl'
    })
    .when('/signup', {
      templateUrl: 'signup.html',
      controller: 'userControl'
    })
    .when('/chat', {
      templateUrl: 'chat.html',
      resolve: checkAuth('/chat'),
      controller: 'ChatController'
    })
    .otherwise({redirectTo: '/login'})
});