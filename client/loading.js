angular.module('kwiki.load', [])

.factory('LoadFactory', ['$location', 'socket', '$window', function ($location, socket, $window) {
  var loadFac = {};

  loadFac.chatId = null;
  loadFac.socket = socket.connect("match");

  loadFac.postMatch = function () {
    // use socket to emit 
    console.log('postMatch wascalled');
    console.log(this.socket);
    // $window.localStorage.debug = '*';
    this.socket.emit('matching', 'sup'); // sending obj with name/id prop
    this.socket.on('matched', function (data) {
      loadFac.chatId = data;
      $location.path('/chat');
    });
  };
  return loadFac;
    
    // return $http({
    //   method: 'POST',
    //   url: '/match'
    //   // data: location data in the future
    // })
    // .then(function (res) {
    //     if (res.status === 201){
    //       loadFac.checkMatch();
    //     }
    // });

  // loadFac.getMatch = function () {
  //   return $http({
  //     method: 'GET',
  //     url: '/match'
  //   });
  // };


  // loadFac.checkMatch = function () {
  //   loadFac.getMatch().then(function (res, err) {
  //     if(res.data.chatId) {
        // loadFac.chatId = res.data.chatId;
        // $location.path('/chat');
  //     } else {
  //       $timeout(function() {
  //         loadFac.checkMatch();
  //       }, 2000);
  //     }
  //   });
  // };
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
