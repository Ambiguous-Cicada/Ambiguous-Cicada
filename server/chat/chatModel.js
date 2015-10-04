var db = require('../db');
var Schema = db.Schema,
    ObjectId = Schema.ObjectId;

var MessageSchema = new Schema({
  userName: String,
  text: String,
  timestamp: Date
});

var ChatroomSchema = new Schema({
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
var Chatroom = db.model('chatrooms', ChatroomSchema);

ChatModel.Chatroom = Chatroom;
ChatModel.Message = Message;

module.exports = ChatModel;
