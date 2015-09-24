var db = require('./db');
var bcrypt = require('bcrypt');

var UserSchema = new db.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  salt: String
});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return new Promise(function(resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err){
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

var User = db.model('users', UserSchema);

// signup function that validates, creates new user and returns a promise
exports.signup = function(username, password) {
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
exports.login = function(username, password) {
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
              resolve(user._id);
            } else {
              reject(new Error('User not found!'));
            }
          });
      }
      });

    });
};
