var ChatRoom = require("./chats.js").ChatRoom;
var Message = require("./chats.js").Message;
var User = require("./auth.js").User;
var coords = require("./coords.js");

// List of waiting users (yet to be matched)
var lobby = [];

// Currently active chatrooms
var openChatRooms = {};

//need method to add user to waiting room
//user should be object with name and id props
exports.joinLobby = function (user, callback) {

  //replace user.address with coords
  coords.getCoords(user.address, function (coordObj) {
    if (coordObj) {
      user.address = coordObj;
    } else {
      console.log("Could not find location for user:", user);
    }

    //store callback in tuple with user object for convenient invocation after the creation of a chat room
    user = [user, callback];

  //look for another user within 5 miles
  for (var i = 0; i < lobby.length; i++) {
    if (coords.getDistance(user[0].address, lobby[i][0].address) < 5) {

      otherUser = lobby.splice(i, 1)[0];

      //make new chatroom in mongo
      ChatRoom.create({
        users: [
          { id: user[0].id,
            name: user[0].name
          },
          { id: otherUser[0].id,
            name: otherUser[0].name
          }
        ],
        messages: []
      }, function (err, chatroom) {
        if (err) {
          console.log(err);
          throw new Error(err);
        } else {
          //add users to open chatrooms hashtabl for easy lookup
          openChatRooms[user[0].id] = chatroom._id;
          openChatRooms[otherUser[0].id] = chatroom._id;

            //invoke each users callback so that socket io will send a response
            user[1](chatroom._id);
            otherUser[1](chatroom._id);
          }
        });
        return; //keep from adding current user to waiting room after a match
      }
    }
  //if no user within that location was found, add this user to the waiting room
  lobby.push(user);
  });
};

// Exit the lobby
//need method to check the open chatrooms data structure
exports.findChatRoom = function (user) {
  //should take a user id as arguments
  //should return a chatroomid or null;
  console.log(openChatRooms);
  return openChatRooms[user.id] || null;
};


//export the above methods
