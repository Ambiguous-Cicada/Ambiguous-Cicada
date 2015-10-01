// var app = angular.module('kwiki', [
//   'kwiki.loading',
//   'ng-route'
//   ])

angular.module('kwiki.chat',['kwiki.load'])
.factory('ChatFactory', ['$http', 'socket', 'LoadFactory', '$window', function ($http, socket, LoadFactory, $window) {

  var chatFac = {}
  chatFac.socket = socket.connect('chat', $window.localStorage.getItem('com.kwiki'));
 

  chatFac.getChat = function (id, callback) {
  //   $http.get('/chats/' + idt)
  //   .then(
  //     function (res) {
  //       callback(res.data);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  };

  chatFac.postMessage = function (data, callback) {
    this.socket.emit()






  //   $http.post('/chats/' + id, data)
  //   .then(
  //     function (res) {
  //       console.log(data);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  };

  return chatFac;

}])

.controller('ChatController', ['LoadFactory', '$scope', 'ChatFactory', '$interval', 'Users', function (LoadFactory, $scope, ChatFactory, $interval, Users) {

  $scope.messages = [];
  $scope.display = function () {
    ChatFactory.getChat(LoadFactory.chatId, function(messages) {
      $scope.messages = messages;
    });
  };

  var timer = $interval(function () {
    $scope.display();
  }, 1000);

  $scope.message = {
    text: ''
  };

  $scope.submit = function () {
    if( $scope.message ){
      ChatFactory.postMessage({ message: this.message.text });
      $scope.messages.unshift(this.message);
      $scope.message.text = '';
    }
  };

  $scope.logOut = function () {
    Users.logOut();
  };

}]);

