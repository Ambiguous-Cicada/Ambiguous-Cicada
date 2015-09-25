angular.module('kwiki', [
  'kwiki.load',
  'kwiki.auth',
  'ngRoute'
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
    .otherwise({redirectTo: '/login'})
});