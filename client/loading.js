angular.module('kwiki.load',[])
// var app = angular.module('kwiki', []);

.factory('LoadFactory', ['$http', '$timeout', function ($http, $timeout) {

  var getMatch = function () {
    return $http({
      method: 'GET',
      url: '/match'
    });
  };

  var checkMatch = function () {
    getMatch().then(function (res, err) {
      if(res.data.chatid) {
        $location.path('/chat');
      } else {
        setTimeout(function() {
          checkMatch();
        }, 700);
      }
    });
  };

  var postMatch = function () {
    return $http({
      method: 'POST',
      url: '/match'
      // data: location data in the future
    }).then(function () {
      checkMatch();
    });
  };

  return {
    postMatch: postMatch,
    getMatch: getMatch,
    checkMatch: checkMatch
  };

}])

.controller('LoadController', ['$scope', '$http', 'LoadFactory', function ($scope, $http, LoadFactory) {

  $scope.bored = function () {

    LoadFactory.postMatch();
    // LoadFactory.getMatch();
  }



}]);
