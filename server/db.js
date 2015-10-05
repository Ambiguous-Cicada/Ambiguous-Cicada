var mongoose = require('mongoose');
var mongoURI = require('./config.js').dbpath;

mongoose.connect(mongoURI);

module.exports = mongoose;
