angular.module('kwiki.load',[])
// var app = angular.module('kwiki', []);

.factory('LoadFactory', ['$location', '$http', function ($location, $http) {

  var getMatch = function () {
    return $http({
      method: 'GET',
      url: '/match'
    });
  };

  var chatId = null;

  var checkMatch = function () {
    getMatch().then(function (res, err) {
      if(res.data.chatId) {
        chatId = res.data.chatId;
        $location.path('/chat')
      } else {
        setTimeout(function() { 
          checkMatch(); 
        }, 700)
      }
    });
  };

  var postMatch = function () {
    return $http({
      method: 'POST', 
      url: '/match'
      // data: location data in the future
    })
    .then(function (res) {
        if (res.status === 201){
          checkMatch()
        }
    });
  };

  return {
    postMatch: postMatch,
    getMatch: getMatch,
    checkMatch: checkMatch,
    chatId: chatId
  };

}])

.controller('LoadController', ['$scope', '$http', 'LoadFactory', function ($scope, $http, LoadFactory) {

  $scope.chatId = LoadFactory.chatId;

  $scope.bored = function () {

    LoadFactory.postMatch();
    // LoadFactory.checkMatch(); 
  }



}]);
