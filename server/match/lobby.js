var chatHandler = require('./chatHandler');

var Lobby = function(matcher) {
  this.matcher = matcher;
  this.chatHandler = chatHandler;
  this._size = 0;
  this.users = [];
};

Lobby.prototype.join = function(user) {
  Promise.all([
      this._add(user),
      this.matcher.preMatch(user)
    ])
    .then(function() {
      this._match();
    }.bind(this));
};

Lobby.prototype.leave = function(user) {
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

Lobby.prototype._add = function(user) {
  return new Promise(function(resolve, reject) {
    this.users.unshift(user);
    this._size++;
    resolve(user);
  }.bind(this));
};

Lobby.prototype._match = function() {
  if(this._size >= this.matcher.roomSize){
    this.matcher.match(this.users)
      .then(function (users) {
        for (var i = 0; i < users.length; i++) {
          this.leave(users[i]);
        }
        chatHandler.createChat(users);
      }.bind(this));
  }
};


module.exports = Lobby;
