var config = {

  development: {
    dbpath: "/kwikidev"
  },

  production: {
    dbpath: "/kwiki"
  }

};

module.exports = config[process.env.NODE_ENV || 'development'];
