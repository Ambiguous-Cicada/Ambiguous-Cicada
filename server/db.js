var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kwiki');

// add Mongoose schemas here? or in individual files?

module.exports = mongoose;
