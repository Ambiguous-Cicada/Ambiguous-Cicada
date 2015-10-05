var config = {

  development: {
    dbpath: 'mongodb://localhost/kwikidev',
    port: 3000,
  },

  production: {
    dbpath: process.env.MONGOLAB_URI || 'DEPLOYED-MONGOLAB-DB-URI',
    port: process.env.PORT || 5000,
    api_keys: {
      geocoding: process.env.API_GEOCODING || "GOOGLE-GEOCODING-API-KEY",
    }
  }

};

// Set current environment here
module.exports = config[process.env.NODE_ENV || 'development'];