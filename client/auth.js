angular.module('kwiki.auth', [])

.factory('Users', function ($http, $location, $window) {
  var addUser = function (userObject) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: userObject
    });
  };

  var checkUser = function (userObject) {
    return $http({
      method: 'POST',
      url: '/login',
      data: userObject
    });
  };

  var logOut = function () {
    $http({
      method: 'POST',
      url: '/logout'
    }).then(function (res) {
      $window.localStorage.removeItem('com.kwiki');
      $location.path('/login');
    })
    .catch(function (err) {
      console.log(err);
    });
  };

  var isAuth = function () {
    return $window.localStorage.getItem('com.kwiki');
  }

  return {
    addUser: addUser,
    checkUser: checkUser,
    logOut: logOut,
    isAuth: isAuth
  };
})

.controller('userControl', function ($scope, $rootScope, $location, $window, Users) {
  $scope.addUser = function (username, password) {
    var userObject = {
      username: username,
      password: password
    };
    Users.addUser(userObject)
    .then(function (res) {
      $scope.checkUser(username, password);
    })
    .catch(function (err) {
      throw err;
    });
  };
  $scope.checkUser = function (username, password) {
    var userObject = {
      username: username,
      password: password
    };

    Users.checkUser(userObject).then(function (res) {
      $window.localStorage.setItem('com.kwiki', JSON.stringify(res.data));
      $rootScope.user = res.data;

      $location.path('/loading');
    });
  };


  $scope.logOut = function () {
    Users.logOut();
  };
});



























