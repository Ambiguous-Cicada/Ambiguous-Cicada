angular.module('kwiki.socket', [])

.factory('SocketFactory', ['$location', function ($location) {
  var socketFact = {};

  socketFact.host = $location.host() + ":8000";

  socketFact.connect = function (nameSpace) {
    return io.connect(this.host + "/" + nameSpace);
  };

  return socketFact;
}]);
