var ChatRoom = require('../chats.js').ChatRoom;

var chatHandler = {};

chatHandler.createChat = function(users) {
  usersDbObj = users.map(function(user) {
    return {
      id: user.id,
      name: user.name
    };
  });

  ChatRoom.create({
    users: usersDbObj,
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
