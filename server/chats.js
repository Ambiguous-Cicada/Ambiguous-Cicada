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

exports.ChatRoom = ChatRoom;
exports.Message = Message;

exports.addMessage = function (chatRoomId, message) {
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

exports.getMessages = function (chatRoomId) {
  return ChatRoom
    .findOne({_id: chatRoomId})
    .populate("messages")
    .exec();
};

