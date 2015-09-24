angular.module('kwiki.auth', ['ChatFactory'])

.factory('Users', function ($http) {
  var addUser = function (userObject) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: userObject
    })
  }

  var checkuser = function (userObject) {
    return $http({
      method: 'GET',
      url: '/login',
      data: userObject
    })
    .then(function (res) {
      return res.data;
    })
  }
})

.controller('userControl', function ($scope, Users, ChatFactory) {
  $scope.addUser = function (username, password) {
    var userObject = {
      username: username,
      username: username
    }

    Users.addUser(userObject);
  }
  $scope.checkUser = function (username, password) {
    var userObject = {
      username: username,
      password: password
    }
    Users.checkUser(userObject).then(res) {
      // if (res === valid){
      //   ChatFactory.
      // }
    }
  }
});