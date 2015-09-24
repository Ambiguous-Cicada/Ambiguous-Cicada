var app = angular.module('kwiki', ['ng-route'])
.config(['$routeProvider'], function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'userControl'
    })
    .when('/signup', {
      templateUrl: 'signup.html',
      controller: 'userControl'
    })
})