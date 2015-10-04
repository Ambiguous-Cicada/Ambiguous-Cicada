var Chatroom = require('./chatModel.js').Chatroom;
var Message = require('./chatModel.js').Message;

var chatController = {};

chatController.createChat = function(users) {
  usersDbObj = users.map(function(user) {
    return {
      id: user.id,
      name: user.name
    };
  });

  Chatroom.create({
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

chatController.addMessage = function (chatroomId, message) {
  Message.create(message).then(function(msg) {
    Chatroom.findOne({_id: chatroomId}, function (err, chatroom) {
      if (err) {
        console.error(err);
      }
      var oldMessages = chatroom.messages;
      oldMessages.push(msg._id);
      Chatroom.findOneAndUpdate({_id: chatroomId}, {messages: oldMessages}).exec();
    });
  });
};

chatController.getMessages = function (chatroomId) {
  return Chatroom
    .findOne({_id: chatroomId})
    .populate("messages")
    .exec();
};

module.exports = chatController;
