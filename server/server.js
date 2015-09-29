// basic server set up
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({
  secret: 'vsafklj4kl2j34kl2',
  resave: true,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  next();
});

app.use("/", express.static(__dirname + '/../client'));

// internal dependencies
var config = require('./env/config');
var auth = require('./auth');
var match = require('./match');
var chats = require('./chats');
var utils = require('./lib/utils');

// Authentication
app.post('/signup', function(req, res) {
  auth.signup(req.body.username, req.body.password)
    .then(function(result) {
      res.status(201)
        .send(result);
    })
    .catch(function(err) {
      res.status(300)
        .send(err);
    });
});

app.post('/login', function(req, res) {
  auth.login(req.body.username, req.body.password)
    .then(function(user) {
      utils.createSession(req, res, user, function() {
        res.status(200).send(user);
      });
    })
    // .then(function() {
    //   res.status(200).redirect('/');
    // })
    .catch(function(err) {
      res.status(300)
        .send(err);
    });
});

app.post('/logout', utils.destroySession, function(req, res) {
  res.status(200).end();
});

// Matching
// do we need both post and login??
app.route('/match')
  .post(function(req, res) {
    //get userObj from req
    var user = req.session.user;
    //send userObj to match.js (to add to waiting room)
    match.joinLobby(user);
    //send back a 201
    res.status(201).send("Added to Lobby");
  })
  .get(function(req, res) {
    //get user from req
    var user = req.session.user;
    //check with match.js if userid has been paired
    var chatId = match.findChatRoom(user);
    //send back either
      //200 with chatroomid
      //200 with null
    res.status(200).send({chatId: chatId});
  });

// Chats
app.route('/chats/:id')
  .post(function(req, res) {
    //get info needed to construct message
    var chatRoomId = req.params.id;
    var message = req.body.message;
    var name = req.session.user.name;
    var timeStamp = new Date();

    //add message to chatroom messages
    chats.addMessage(chatRoomId, {
      userName: name,
      text: message,
      timeStamp: timeStamp
    });

  })
  .get(function(req, res) {
    //req should have a chatroomid on it
    var chatRoomId = req.params.id;

    //return messages of that chatroom
    chats.getMessages(chatRoomId)
      .then(function (chatroom) {
        res.status(200).send(chatroom.messages);
      })
      .reject(function (err) {
        console.log(err);
        res.status(404).send(err);
      });
  });

app.listen(process.env.PORT || 3000);

module.exports = app;
