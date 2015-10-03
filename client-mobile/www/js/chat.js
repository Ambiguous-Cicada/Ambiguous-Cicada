angular.module('kwiki.chat',[])

.factory('ChatFactory', ['$http', '$rootScope', 'SocketFactory', '$window', function ($http, $rootScope, SocketFactory, $window) {

  var chatFact = {};

  chatFact.socket = SocketFactory.connect('chat', $rootScope.user);

  chatFact.loadChat = function(callback) {
    console.log($rootScope.chatRoomId);
    this.socket.emit('loadChat', $rootScope.chatRoomId);
    this.socket.on('message', function (message) {
      callback(message);
    });
    this.socket.on('leaveChat', function () {
      callback(null, true);
    });
  };

  chatFact.leaveChat = function () {
    this.socket.emit('leaveChat', $rootScope.chatRoomId);
  };

  chatFact.postMessage = function (message, callback) {
    this.socket.emit('message', message);
  };

  return chatFact;

}])

.controller('ChatCtrl', ['$rootScope', '$state', '$scope', '$rootScope', 'ChatFactory', 'AuthFactory', function ($rootScope, $state, $scope, $rootScope, ChatFactory, AuthFactory) {

  $scope.messages = [];

  $scope.message = {
    userName: $rootScope.user.name,
    text: ''
  };

  $scope.leaveChat = function (logout) {
    $scope.messages = [];
    $rootScope.disableButton = false;
    ChatFactory.leaveChat();
    $state.go('match'); 
  };

  $scope.loadChat = function() {
    ChatFactory.loadChat(function (message, leavechat) {
      if (leavechat) {
        $state.go('match');
        $scope.messages = [];
      } else {
        $scope.messages.push(message);
        $scope.$apply();
      }
    });
  };

  $scope.sendMessage = function () {
    if( $scope.message ){
      ChatFactory.postMessage(this.message);
      $scope.messages.push({
        userName: this.message.userName,
        text: this.message.text
      });
      $scope.message.text = '';
    }
  };

  $scope.logOut = function () {
    $scope.messages = [];
    $rootScope.disableButton = false;
    ChatFactory.leaveChat();
    AuthFactory.logOut();
  };

}]);

