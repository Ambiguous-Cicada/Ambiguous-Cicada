var ChatRoom = require('./chatModel.js').ChatRoom;
var Message = require('./chatModel.js').Message;

var chatController = {};

chatController.createChat = function(users) {
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

chatController.addMessage = function (chatRoomId, message) {
  Message.create(message).then(function(msg) {
    ChatRoom.findOne({_id: chatRoomId}, function (err, chatroom) {
      if (err) {
        console.error(err);
      }
      var oldMessages = chatroom.messages;
      oldMessages.push(msg._id);
      ChatRoom.findOneAndUpdate({_id: chatRoomId}, {messages: oldMessages}).exec();
    });
  });
};

chatController.getMessages = function (chatRoomId) {
  return ChatRoom
    .findOne({_id: chatRoomId})
    .populate("messages")
    .exec();
};

module.exports = chatController;
