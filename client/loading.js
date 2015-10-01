angular.module('kwiki.load', [])

.factory('LoadFactory', ['$location', 'SocketFactory', '$window', '$rootScope', function ($location, SocketFactory, $window, $rootScope) {
  var loadFact = {};

  loadFact.socket = SocketFactory.connect("match");

  loadFact.postMatch = function () {
    this.socket.emit('matching', $rootScope.user);
    this.socket.on('matched', function (data) {
      $rootScope.chatRoomId = data;
      $rootScope.$apply(function () {
        $location.path('/chat');
      });
    });
  };
  
  return loadFact;
}])

.controller('LoadController', ['$scope', 'LoadFactory', 'Users', function ($scope, LoadFactory, Users) {
  $scope.disableButton = false;

  $scope.submit = function () {
    $scope.disableButton = true;
    LoadFactory.postMatch();
  };

  $scope.logOut = function () {
    Users.logOut();
  };
}]);
