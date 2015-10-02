angular.module('kwiki.chat',[])

.factory('ChatFactory', ['$http', '$rootScope', 'SocketFactory', '$window', function ($http, $rootScope, SocketFactory, $window) {

  var chatFact = {};

  chatFact.socket = SocketFactory.connect('chat', $rootScope.user);

  chatFact.loadChat = function(callback) {
    this.socket.emit('loadChat', $rootScope.chatRoomId);
    this.socket.on('message', function(message) {
      callback(message);
    });
  };

  chatFact.leaveChat = function () {
    this.socket.emit('leaveChat', $rootScope.chatRoomId);
  };

  chatFact.postMessage = function (message, callback) {
    console.log(message);
    this.socket.emit('message', message);
  };

  return chatFact;

}])

.controller('ChatCtrl', ['$state', '$scope', '$rootScope', 'ChatFactory', 'AuthFactory', function ($state, $scope, $rootScope, ChatFactory, AuthFactory) {

  $scope.messages = [];

  $scope.message = {
    userName: $rootScope.user.name,
    text: ''
  };

  $scope.leaveChat = function () {
    ChatFactory.postMessage({
      userName: $rootScope.user.name,
      text: $rootScope.user.name + ' has left the chat.'
    });
    ChatFactory.leaveChat();
    $state.go('match');
  };

  $scope.loadChat = function() {
    ChatFactory.loadChat(function(message) {
      $scope.messages.unshift(message);
      $scope.$apply();
    });
  };

  $scope.sendMessage = function () {
    if( $scope.message ){
      ChatFactory.postMessage(this.message);
      $scope.messages.unshift({
        userName: this.message.userName,
        text: this.message.text
      });
      $scope.message.text = '';
    }
  };

  $scope.logOut = function () {
    AuthFactory.logOut();
  };

}]);

