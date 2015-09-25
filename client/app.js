angular.module('kwiki', [
  'kwiki.load',
  'kwiki.auth',
  'ngRoute',
  'kwiki.chat'
  ])
.config(function ($routeProvider) {
  $routeProvider
    .when('/loading', {
      templateUrl: 'loading.html',
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
      controller: 'ChatController'
    })
    .otherwise({redirectTo: '/login'})
});