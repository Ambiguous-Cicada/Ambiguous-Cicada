angular.module('kwiki.auth', [])

.factory('Users', function ($http) {
  var addUser = function (userObject) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: userObject
    })
  }

  var checkUser = function (userObject) {
    return $http({
      method: 'POST',
      url: '/login',
      data: userObject
    })
    // .then(function (res) {
    //   return res.data;
    // })
  }

  return {
    addUser: addUser,
    checkUser: checkUser
  }
})

.controller('userControl', function ($scope, $location, Users) {
  $scope.addUser = function (username, password) {
    var userObject = {
      username: username,
      password: password
    }
    console.log(userObject);
    Users.addUser(userObject);
  }
  $scope.checkUser = function (username, password) {
    var userObject = {
      username: username,
      password: password
    }

    Users.checkUser(userObject).then(function (res) {
      // console.log('DATA:', res.data);
      window.localStorage['com.kwiki'] = JSON.stringify(res.data.data);
      $location.path('/loading');
    });
  }
});



























