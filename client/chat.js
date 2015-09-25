// var app = angular.module('kwiki', [
//   'kwiki.loading',
//   'ng-route'
//   ])

angular.module('kwiki.chat',[])
.factory('ChatFactory', ['$http', function ($http) {

  var getChat = function (callback) {
    $http.get('/chats/:id')
    .then(
      function (res) {
        callback(res.data);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  var postMessage = function (data, callback) {
    $http.post('/chats/:id', data)
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

.controller('ChatController', ['$scope', 'ChatFactory', '$interval', function ($scope, ChatFactory, $interval) {

  $scope.messages = [];
  // var count = 0;
  $scope.display = function () {
    ChatFactory.getChat(function(messages) {
      $scope.messages = messages;
    });
    // $scope.messages.unshift(count);
    // count++;
    console.log($scope.messages);
  };

  var timer = $interval(function () {
    $scope.display();
  }, 1000);
  
  $scope.message = '';

  $scope.submit = function () {
    if( $scope.message ){
      ChatFactory.postMessage(this.message, function() {
        console.log('ChatFactory.postMessage was called');
      });
      $scope.messages.unshift(this.message);
      $scope.message = '';
    }
  };

}])

