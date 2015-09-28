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

exports.createSession = function(req, res, user) {
  req.session.regenerate(function() {
    req.session.user = user;
    req.session.save();
    res.status(200).end();
  });
};
