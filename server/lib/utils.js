var isLoggedIn = function(req) {
  return req.session ? !! req.session.user : false;
};

exports.checkUser = function(req, res, next) {
  if (!isLoggedIn(req)){
    res.redirect('/login');
  } else {
    next();
  }
};

exports.createSession = function(req, res, user, next) {
  req.session.regenerate(function() {
    req.session.user = user;
    req.session.save();
    next();
  });
};

exports.destroySession = function(req, res, next) {
  req.session.destroy(function(err) {
    if(err){
      res.status(200).send(err);
    } else {
      next();
    }
  });
};
