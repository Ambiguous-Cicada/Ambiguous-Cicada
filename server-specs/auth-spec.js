// Authentication
// Need to run the server first
var request = require('supertest');

var app = require('../server/server.js');

//describe block  - for non-logged in use
describe('Unauthenticated use of server API', function() {

  it('Should not allow requests to /match without being logged-in', function(done) {

    request(app)
      .get('/match')
      .expect(401);

    request(app)
      .post('/match')
      .expect(401, done);

  });

 it('Should not allow requests to /chats or /chats/:id without a session', function (done) {

  request(app)
    .get('/chats/5609bc39910405ef1082986e')
    .expect(401)

  request(app)
    .post('/chats/5609bc39910405ef1082986e')
    .expect(401, done)

 });

});

//describe block - testing login and log out
describe('Log in, log out and other authentication tests', function() {
  var creds = { username: "dko", password: "dko" };

  it('should allow signup', function(done) {
    request(app)
      .post('/signup')
      .send(creds)
      .expect(201, done);
  });

  it('should allow login', function(done) {
    request(app)
      .post('/login')
      .send(creds)
      .expect(200, done);
  });

  it('should allow logout', function(done) {
    request(app)
      .post('/logout')
      .expect(201, done);
  });

  it('should not create session with invalid username and password to /login', function(done) {
    var credsN = '12435$%^#&%_',
        credsP = ['1', '12', '123', '1234', '12345']
    for (var i = 0; i < credsN.length; i++) {
      request(app)
        .post('/signup')
        .send({ "username": credsN[i], "password": "123456" })
        .expect(301)
    }
    for (var i = 0; i < credsP.length; i++) {
      request(app)
        .post('/signup')
        .send({ "username": "dko"+i, "password": credsP[i] })
        .expect(301)
    }

  });

  //   Should make a new user with a request to /signup
  //      requires checking the db

  it('Should not make a new user if one already exists', function(done) {
    var creds = { "username": "dxo", "password": "dxo" };
    request(app)
      .post('/signup')
      .send(creds)
      .expect(201)

    request(app)
      .post('/signup')
      .send(creds)
      .expect(301, done) // ???
  });

});

describe('Server API when logged-in', function() {

  beforeEach(function(done) {
    request(app)
      .post('/login')
      .send(creds)
      .end(done);
  });

  afterEach(function() {
    request(app)
      .post('/logout')
      .send(creds)
      .end(done);
  });

  it('Should not allow requests to /match without being logged-in', function(done) {

    request(app)
      .post('/match')
      .expect(202, done);

    request(app)
      .get('/match')
      .expect(200, done);

  });

  it('Should only allow access to chat messages which the user is a part of', function(done) {

  });

  it('Should create session with valid username and password to /login', function(done) {

  });

});

