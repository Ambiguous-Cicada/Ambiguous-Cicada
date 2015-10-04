var Lobby = function(matcher, chatHandler) {
  this.matcher = matcher;
  this.chatHandler = chatHandler;
  this.size = 0;
  this.users = [];
};

Lobby.prototype.join = function(user) {
  this._add(user)
    .then(this.matcher.preMatch)
    .then(function(user) {
      this._match();
      return user;
    });
};

Lobby.prototype.leave = function(user) {
  return new Promise(function(resolve, reject) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i] === user){
        resolve(this.users.splice(i,1));
      }
    }
    reject(new ReferenceError('User '+ user +' not found in lobby'));
  }.bind(this));
};

Lobby.prototype._add = function(user) {
  return new Promise(function(resolve, reject) {
    this.users.unshift(user);
    resolve(user);
  }.bind(this));
};

Lobby.prototype._match = function() {
  if(this.size >= this.matcher.roomSize){
    this.matcher.match(this.users)
      .then(function (users) {
        for (var i = 0; i < users.length; i++) {
          this.leave(users[i]);
        }
        this.chatHandler.createChat(users);
      });
  }
};


module.exports = Lobby;
