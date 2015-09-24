// basic server set up
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

// internal dependencies
var auth = require('./auth');
var match = require('./match');
var chats = require('./chats');

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
    .then(function(result) {
      res.status(200)
        .send(result);
    })
    .catch(function(err) {
      res.status(300)
        .send(err);
    });
});

// Matching
// do we need both post and login??
app.route('/match')
  .post(function(req, res) {

  })
  .get(function(req, res) {

  });

// Chats
app.route('/chats')
  .post(function(req, res) {

  })
  .get(function(req, res) {

  });

app.listen(process.env.PORT || 3000);
