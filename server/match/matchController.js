
var MatchModel = require('./matchModel');
var CoordMatcher = require('./coordMatcher');

var roomSize = 2;
var maxDist = 5;
var matcher = new CoordMatcher(roomSize, maxDist);

var lobby = new MatchModel(matcher);

var matchController = {};

matchController.add = function (user, joinChatCallback) {
  user.join = joinChatCallback;
  return lobby.join(user);
};

matchController.remove = function (user) {
  lobby.leave(user);
};

module.exports = matchController;
