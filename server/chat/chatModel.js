var db = require('../db');
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
