// var app = angular.module('kwiki', [
//   'kwiki.loading',
//   'ng-route'
//   ])

angular.module('kwiki.chat',['kwiki.load'])
.factory('ChatFactory', ['$http', function ($http) {

  var getChat = function (id, callback) {
    $http.get('/chats/' + id)
    .then(
      function (res) {
        callback(res.data);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  var postMessage = function (id, data, callback) {
    $http.post('/chats/' + id, data)
    .then(
      function (res) {
        callback();
      },
      function (err) {
        console.error(err);
      }
    );
  };

  return {
    getChat: getChat,
    postMessage: postMessage
  };

}])

.controller('ChatController', ['LoadFactory', '$scope', 'ChatFactory', '$interval', function (LoadFactory, $scope, ChatFactory, $interval) {

  $scope.messages = [];
  $scope.display = function () {
    ChatFactory.getChat(LoadFactory.chatId, function(messages) {
      $scope.messages = messages;
    });
    console.log($scope.messages);
  };

  var timer = $interval(function () {
    $scope.display();
  }, 1000);
  
  $scope.message = '';

  $scope.submit = function () {
    if( $scope.message ){
      ChatFactory.postMessage(LoadFactory.chatId, this.message, function() {
        console.log('ChatFactory.postMessage was called');
      });
      $scope.messages.unshift(this.message);
      $scope.message = '';
    }
  };

}])

