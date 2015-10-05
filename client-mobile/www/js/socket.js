angular.module('kwiki.socket', [])

.factory('SocketFactory', ['$location', function ($location) {
  var socketFact = {};

<<<<<<< HEAD
  socketFact.host = $location.host() + ":8000";
=======
  //hacky way to make this work in developer environments at specified port number
  socketFact.host = $location.host() !== "localhost" ? $location.host() : "localhost:3000";
>>>>>>> 36bec6a8a6c517934c8ce862b31f95b75363fce5

  socketFact.connect = function (nameSpace) {
    if (!nameSpace) {
      return io.connect(this.host, { forceNew: true });
    } else {
      return io.connect(this.host + "/" + nameSpace);
    }
  };

  return socketFact;
}]);
