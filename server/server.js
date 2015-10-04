// Basic Server Requirements
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var app = express();
var cors = require('cors');
var socketIOServer = require('http').Server(app);
var io = require('socket.io')(socketIOServer);

// Internal Dependencies
var config = require('./env/config');
var auth = require('./auth');
var match = require('./match');
var matchCtrl = require('./match/matchController');
var chats = require('./chats');
var utils = require('./lib/utils');

socketIOServer.listen(config.socketPort);

if( (process.env.NODE_ENV === 'development') || !(process.env.NODE_ENV) ){
  app.use(logger('dev'));
}

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'vsafklj4kl2j34kl2',
  resave: true,
  saveUninitialized: true
}));
app.use("/", express.static(__dirname + '/../client-web'));


// Sockets Connection
io.on('connection', function(socket){
  console.log('Socket '+ socket.id +' connected.');
  socket.on('disconnect', function(){
    console.log('Socket '+ socket.id +' disconnected.');
    socket.disconnect();
  });
});

// Sockets Matching Namespace
io.of('/match').on('connection', function (socket) {
  socket.on('matching', function (data) {
    matchCtrl.add(data, function (chatRoomId) {
      socket.emit('matched', chatRoomId);
    });
  });
});

// Sockets Chatting Namespace
io.of('/chat').on('connection', function (socket) {
  socket.on('loadChat', function (chatRoomId) {
    socket.join(chatRoomId);
    socket.on('message', function (message) {
      socket.to(chatRoomId).broadcast.emit('message', message);
      chats.addMessage(chatRoomId, message);
    });
  });
  socket.on('leaveChat', function (chatRoomId) {
    socket.to(chatRoomId).broadcast.emit('leaveChat');
    var room = io.nsps['/chat'].adapter.rooms[chatRoomId];
    for( var sock in room ) {
      io.sockets.connected[sock].leave(chatRoomId);
    }
  });
});

// Authentication Routes
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
    .catch(function(err) {
      res.status(300)
        .send(err);
    });
});

app.post('/logout', utils.destroySession, function(req, res) {
  res.status(200).end();
});

app.listen(config.httpPort);

module.exports = app;
