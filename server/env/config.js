var config = {

  development: {
    dbpath: 'mongodb://localhost/kwikidev',
    httpPort: 3000,
    socketPort: 8000
  },

  production: {
    dbpath: process.env.DB_HOST + '/kwiki',
    httpPort: process.env.PORT || 3000,
    socketPort: process.env.PORT || 8000
  }

};

// Set current environment here
module.exports = config[process.env.NODE_ENV || 'development'];
