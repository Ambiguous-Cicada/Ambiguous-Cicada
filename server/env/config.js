var config = {

  development: {
    dbpath: "/kwikidev",
    httpPort: 3000,
    socketPort: 8000
  },

  production: {
    dbpath: "/kwiki",
    httpPort: process.env.PORT || 3000,
    socketPort: process.env.SOCK_PORT || 8000
  }

};

// Set current environment here
module.exports = config[process.env.NODE_ENV || 'development'];
