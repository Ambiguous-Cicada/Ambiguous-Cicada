angular.module('kwiki.match', [])

.factory('MatchFactory', ['$state', 'SocketFactory', '$window', '$rootScope', function ($state, SocketFactory, $window, $rootScope) {
  var matchFact = {};

  matchFact.connectSocket = function () {
    this.socket = SocketFactory.connect("match");
    console.log(this.socket);
  };

  matchFact.postMatch = function () {
    this.socket.emit('matching', $rootScope.user);
    this.socket.on('matched', function (data) {
      $rootScope.chatRoomId = data;
      console.log($rootScope.chatRoomId);
      console.log($rootScope.user);
      $rootScope.$apply(function () {
        $state.go('chat');
      });
    });
  };

  return matchFact;
}])

.controller('MatchCtrl', ['$rootScope', '$state', '$scope', 'MatchFactory', 'AuthFactory', function ($rootScope, $state, $scope, MatchFactory, AuthFactory) {
  $rootScope.disableButton = false;

  $scope.connect = function() {
    MatchFactory.connectSocket();
  };

  $scope.submit = function () {
    $rootScope.disableButton = true;
    MatchFactory.postMatch();
    $state.go('load');
  };

  $scope.logOut = function () {
    $rootScope.disableButton = false;
    AuthFactory.logOut();
  };
}]);
