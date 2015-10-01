angular.module('kwiki.load', [])

.factory('LoadFactory', ['$location', 'SocketFactory', '$window', '$rootScope', function ($location, SocketFactory, $window, $rootScope) {
  var loadFact = {};

  loadFact.socket = SocketFactory.connect("match");

  loadFact.postMatch = function () {
    // use socket to emit
    this.socket.emit('matching', $rootScope.user); // sending obj with name/id prop
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
  $scope.buttonDisabled = false;
  $scope.submit = function () {
    $scope.buttonDisabled = true;
    LoadFactory.postMatch();
  };

  $scope.logOut = function () {
    Users.logOut();
  };

}]);
