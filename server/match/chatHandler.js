var ChatRoom = require('./chats.js');

var chatHandler = {};

chatHandler.createChat = function(users) {
  users = users.map(function(user) {
    return {
      id: user.id,
      name: user.name
    };
  });

  ChatRoom.create({
    users: users,
    messages: []
  }, function(err, chatroom) {
    if(err){
      throw new Error(err);
    }
    users.forEach(function(user) {
      user.join(chatroom._id);
    });
  });
};

module.exports = chatHandler;
