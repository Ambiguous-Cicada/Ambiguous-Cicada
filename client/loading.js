// var app = angular.module('kwiki', [
//   // 'kwiki.loading',
//   // 'ng-route'
//   ])

angular.module('kwiki.loading',[])

.controller('LoadingController', ['$scope', '$http', function ($scope, $http) {

  $scope.loading = 'Looking for a kwiki';

}])

.factory('LoadingFactory', ['$http', function ($http) {
  
}]);
