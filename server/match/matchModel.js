var chatController = require('../chat/chatController');

var MatchModel = function(matcher) {
  this._matcher = matcher;
  this._size = 0;
  this.users = [];
};

MatchModel.prototype.join = function(user) {
  return Promise.all([
      this._add(user),
      this._matcher.preMatch(user)
    ])
    .then(function() {
      this._match();
    }.bind(this));
};

MatchModel.prototype.leave = function(user) {
  return new Promise(function(resolve, reject) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i] === user){
        resolve(this.users.splice(i,1)[0]);
        this._size--;
      }
    }
    reject(new ReferenceError('User '+ user +' not found in lobby'));
  }.bind(this));
};

MatchModel.prototype._add = function(user) {
  return new Promise(function(resolve, reject) {
    if(this._isDuplicate(user)){
      reject(new Error('User is already in the lobby'));
    }
    this.users.unshift(user);
    this._size++;
    resolve(user);
  }.bind(this));
};

MatchModel.prototype._isDuplicate = function(user) {
  for (var i = 0; i < this.users.length; i++) {
    if (this.users[i].id === user.id) {
      return true;
    }
  }
  return false;
};

MatchModel.prototype._match = function() {
  if(this._size >= this._matcher.roomSize){
    this._matcher.match(this.users)
      .then(function (users) {
        for (var i = 0; i < users.length; i++) {
          this.leave(users[i]);
        }
        chatController.createChat(users);
      }.bind(this));
  }
};

module.exports = MatchModel;
