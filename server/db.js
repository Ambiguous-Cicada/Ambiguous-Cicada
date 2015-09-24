var mongoose = require('mongoose');

mongoose.connect(process.env.DBPATH || 'mongodb://localhost/kwiki');

module.exports = mongoose;
