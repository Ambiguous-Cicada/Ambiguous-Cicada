angular.module('kwiki.auth', [])


.controller('userControl', function ($scope) {
  $scope.addUser = function (username, password) {
    console.log(username, password);
  }
  $scope.checkUser = function (username, password) {
    console.log(username, password)
  }
});