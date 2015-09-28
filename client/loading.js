angular.module('kwiki.load', [])

.factory('LoadFactory', ['$http', '$timeout', '$location', function ($http, $timeout, $location) {
  var loadFac = {};

  loadFac.getMatch = function () {
    return $http({
      method: 'GET',
      url: '/match'
    });
  };

  loadFac.chatId = null;

  loadFac.checkMatch = function () {
    loadFac.getMatch().then(function (res, err) {
      if(res.data.chatId) {
        loadFac.chatId = res.data.chatId;
        $location.path('/chat');
      } else {
        $timeout(function() {
          loadFac.checkMatch();
        }, 2000);
      }
    });
  };

  loadFac.postMatch = function () {
    return $http({
      method: 'POST',
      url: '/match'
      // data: location data in the future
    })
    .then(function (res) {
        if (res.status === 201){
          loadFac.checkMatch();
        }
    });
  };

  return loadFac;

}])

.controller('LoadController', ['$scope', '$http', 'LoadFactory', 'Users', function ($scope, $http, LoadFactory, Users) {
  $scope.buttonDisabled = false;
  $scope.submit = function () {
    $scope.buttonDisabled = true;
    LoadFactory.postMatch();
  };

  $scope.logOut = function () {
    Users.logOut();
  };

}]);
