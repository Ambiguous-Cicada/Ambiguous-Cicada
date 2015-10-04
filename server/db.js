var mongoose = require('mongoose');
var config = require('./env/config');

mongoose.connect(config.dbpath);

module.exports = mongoose;
