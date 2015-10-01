var kwiki = angular.module('kwiki', [
  'kwiki.load',
  'kwiki.auth',
  'kwiki.chat',
  'ngRoute'
]);

kwiki.factory('socket', ['$location', function ($location) {
  var socketFac = {};
  socketFac.host = $location.host() + ":8000";
  socketFac.connect = function (nameSpace, data) {
  console.log("attempting connection to:", this.host + "/" + nameSpace);
    return io.connect(this.host + "/" + nameSpace, data);
  };
  return socketFac;
}]);

kwiki.config(function ($routeProvider) {

  var checkAuth = function (success, failure) {
    failure = failure || '/login';
    return {
      'check' : function ($location, Users) {
        if(!!Users.isAuth()){
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
    .otherwise({redirectTo: '/login'});
});
