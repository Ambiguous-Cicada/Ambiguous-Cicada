var db = require('./db');
// var mongoose = require('mongoose');
var Schema = db.Schema,
    ObjectId = Schema.ObjectId;

var MessageSchema = new Schema({
  userName: String,
  text: String,
  timestamp: Date
});

var ChatRoomSchema = new Schema({
  users: [{
    id: String,
    name: String,
  }],
  messages: [{
    type: ObjectId,
    ref: 'messages'
  }]
});

var Message = db.model('messages', MessageSchema);
var ChatRoom = db.model('chatrooms', ChatRoomSchema);

// var newChat = new ChatRoom({
//   users: [{id: 23234234234324, name: 'Pericles'}],
//   messages: []
// });
// newChat.save();

exports.addMessage = function (chatRoomId, message) {
  Message.create(message).then(function(msg) {
    ChatRoom.findOne({_id: chatRoomId}, function (chatroom) {
      chatroom.messages.push(msg._id);
    });
  });
};

exports.getMessages = function (chatRoomId) {
  return ChatRoom
    .findOne({_id: chatRoomId})
    .populate("messages")
    .exec();
};

exports.ChatRoom = ChatRoom;
exports.Message = Message;
