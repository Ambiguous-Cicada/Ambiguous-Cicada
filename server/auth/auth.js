var User = require('./userModel');

var Auth = {};

// signup function that validates, creates new user and returns a promise
Auth.signup = function(username, password) {
  return new Promise(function(resolve, reject) {
    User.findOne({username: username}, function(err, user) {
      if (user) {
        reject(new Error('User already exist!'));
      } else {
        newUser = {
          username: username,
          password: password
        };
        User.create(newUser, function(err, user) {
          if (err) reject(err);
          else resolve(user.id);
        });
      }
    });
  });
};

// login function that validates, authenticates and returns a promise
Auth.login = function(username, password) {
  return new Promise(function(resolve, reject) {
    User.findOne({username: username}, function(err, user) {
      if(err){
        throw new Error(err);
      }

      if (!user) {
        reject('User does not exist');
      } else {
        return user.comparePasswords(password)
          .then(function (foundUser) {
            if (foundUser) {
              resolve({
                id: user._id,
                name: user.username
              });
            } else {
              reject(new Error('User not found!'));
            }
          });
      }
      });

    });
};

module.exports = Auth;
