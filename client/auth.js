angular.module('kwiki.auth', [])

.factory('Users', function ($http) {
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
    // .then(function (res) {
    //   return res.data;
    // })
  };

  var logOut = function () {
    $http({
      method: 'POST',
      url: '/logout'
    }).then(function (res) {
      delete window.localStorage['com.kwiki'];
      $location.path('/login');
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  return {
    addUser: addUser,
    checkUser: checkUser,
    logOut: logOut
  };
})

.controller('userControl', function ($scope, $location, Users) {
  $scope.addUser = function (username, password) {
    var userObject = {
      username: username,
      password: password
    };
    console.log(userObject);
    Users.addUser(userObject);
  };
  $scope.checkUser = function (username, password) {
    var userObject = {
      username: username,
      password: password
    };

    Users.checkUser(userObject).then(function (res) {
      // console.log('DATA:', res.data);
      window.localStorage['com.kwiki'] = JSON.stringify(res.data.data);
      $location.path('/loading');
    });
  };

  $scope.logOut = function () {
    Users.logOut();
  };
});



























