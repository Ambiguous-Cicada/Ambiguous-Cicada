var mongoose = require('mongoose');
var config = require('./env/config');

var mongoURI = process.env.MONGOLAB_URI || config.dbpath;

mongoose.connect(mongoURI);

module.exports = mongoose;
