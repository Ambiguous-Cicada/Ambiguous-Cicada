angular.module('kwiki.match', [])

.factory('MatchFactory', ['$state', 'SocketFactory', '$window', '$rootScope', function ($state, SocketFactory, $window, $rootScope) {
  var matchFact = {};

  matchFact.socket = SocketFactory.connect("match");

  matchFact.postMatch = function () {
    this.socket.emit('matching', $rootScope.user);
    this.socket.on('matched', function (data) {
      $rootScope.chatRoomId = data;
      $rootScope.$apply(function () {
        $state.go('chat');
      });
    });
  };

  return matchFact;
}])

.controller('MatchCtrl', ['$state', '$scope', 'MatchFactory', 'AuthFactory', function ($state, $scope, MatchFactory, AuthFactory) {
  $scope.disableButton = false;

  $scope.submit = function () {
    $scope.disableButton = true;
    MatchFactory.postMatch();
    $state.go('load');
  };

  $scope.logOut = function () {
    AuthFactory.logOut();
  };
}]);
