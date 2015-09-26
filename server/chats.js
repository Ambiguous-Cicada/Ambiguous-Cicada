// var db = require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ChatRoomSchema = new Schema({
  users: [{
    id: Number,
    name: String,
  }],
  messages: {
    type: ObjectId,
    ref: 'MessageSchema'
  }
});

var MessageSchema = new Schema({
  userName: String,
  text: String,
  timestamp: Date
});

exports.ChatRoom = ChatRoom = mongoose.model('chatrooms', ChatRoomSchema);
exports.Message = Message = mongoose.model('messages', MessageSchema);

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

