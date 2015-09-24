var app = angular.module('kwiki', [
  'kwiki.loading',
  'ng-route'
  ])
.config(['$routeProvider'], function ($routeProvider) {
  $routeProvider
    .when('/loading', {
      templateUrl: 'client/loading.html',
      controller: 'LoadingController'
    })
})