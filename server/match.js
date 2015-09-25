// var db = require('./db');
var ChatRoom = require("./chats.js").ChatRoom;
var Message = require("./chats.js").Message;
var User = require("./auth.js").User;

//create waiting room that will hold userids
var waitingRoom = [];

//create open chatrooms data structure
var openChatRooms = {};

//need method to add user to waiting room
//user should be object with name and id props
exports.joinLobby = function (user) {
  //on add check if another user is in waiting room
  if (waitingRoom.length) {
    //remove both user ids from waiting room
    var otherUser = waitingRoom.pop();
    //make a new entry on chatrooms DB
    ChatRoom.create({
      users: [
        { id: user.id,
          name: user.name
        },
        { id: otherUser.id,
          name: otherUser.name
        }
      ]
    })
    //add those user ids and chatroom id to chatrooms data structure
    .then(function (chatroom) {
      openChatRooms[user.id] = chatroom._id;
      openChatRooms[otherUser.id] = chatroom._id;
    });
    
  } else {
    waitingRoom.push(user);
  }
};

//need method to check the open chatrooms data structure
exports.findChatRoom = function (user) {
  //should take a user id as arguments
  //should return a chatroomid or null
  return openChatRooms[user.id] || null;
};


//export the above methods
