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
