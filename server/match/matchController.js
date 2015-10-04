var Lobby = require('./lobby');
var CoordMatcher = require('./coordMatcher');

var roomSize = 2;
var maxDist = 5;
var matcher = new CoordMatcher(roomSize, maxDist);

var lobby = new Lobby(matcher);

var matchController = {};

matchController.add = function (user, joinChatFunction) {
  user.join = joinChatFunction;
  lobby.join(user);
};

matchController.remove = function (user) {
  lobby.leave(user);
};

module.exports = matchController;

