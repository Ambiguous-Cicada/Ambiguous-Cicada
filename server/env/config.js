var fs = require('fs');
var path = require('path');

// Set config variable file here
module.exports = JSON.parse(fs.readFileSync(__dirname+'/dev.json'));
