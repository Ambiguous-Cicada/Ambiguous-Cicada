angular.module('kwiki', [
  'kwiki.loading',
  'kwiki.auth',
  'ngRoute'
  ])
.config(function ($routeProvider) {
  $routeProvider
    .when('/loading', {
      templateUrl: 'loading.html',
      controller: 'LoadingController'
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