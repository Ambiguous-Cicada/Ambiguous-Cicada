angular.module('kwiki', [
  'kwiki.load',
  'kwiki.auth',
  'kwiki.chat',
  'ngRoute'
])

.factory('SocketFactory', ['$location', function ($location) {
  var socketFact = {};

  socketFact.host = $location.host()/* + ":8000"*/;

  socketFact.connect = function (nameSpace) {
    return io.connect(this.host + "/" + nameSpace);
  };

  return socketFact;
}])

.config(['$routeProvider', function ($routeProvider) {

  var checkAuth = function (success, failure) {
    failure = failure || '/login';
    return {
      check: function ($location, Users) {
        if(!!Users.isAuth()){
          $location.path(success);
        } else {
          $location.path(failure);
        }
      }
    };
  };

  $routeProvider
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'userControl'
    })
    .when('/signup', {
      templateUrl: 'signup.html',
      controller: 'userControl'
    })
    .when('/loading', {
      templateUrl: 'loading.html',
      resolve: checkAuth('/loading'),
      controller: 'LoadController'
    })
    .when('/chat', {
      templateUrl: 'chat.html',
      resolve: checkAuth('/chat'),
      controller: 'ChatController'
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);
