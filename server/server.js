var express = require('express');
var bodyParser = require('bodyParser');
var db = require('./db');
var app = express();

app.use(bodyParser.json());

// auth
app.route('/login').post(function(req, res) {

});

app.route('/signup').post(function(req, res) {

});

// matching
app.route('/match')
  .post(function(req, res) {

  })
  .get(function(req, res) {

  });

// chats
app.route('/chats')
  .post(function(req, res) {

  })
  .get(function(req, res) {

  });

app.listen(process.ENV.PORT || 3000);
