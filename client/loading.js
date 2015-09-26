angular.module('kwiki.load',[])
// var app = angular.module('kwiki', []);

.factory('LoadFactory', ['$http', '$timeout', function ($http, $timeout) {

  var getMatch = function () {
    return $http({
      method: 'GET',
      url: '/match'
    });
  };

  var chatId = null;

  var checkMatch = function () {
    getMatch().then(function (res, err) {
      if(res.data.chatid) {
        $location.path('/chat');
      } else {
        $timeout(function() {
          checkMatch();
        }, 2000);
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
          checkMatch();
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

  };



}]);
