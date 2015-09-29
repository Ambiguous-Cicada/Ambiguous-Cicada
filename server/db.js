var mongoose = require('mongoose');
var config = require('./env/config');

mongoose.connect('mongodb://localhost'+config.dbpath);

module.exports = mongoose;
