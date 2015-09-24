var express = require('express');
var bodyParser = require('bodyParser');
var app = express();

app.use(bodyParser.json());



app.listen(process.ENV.PORT || 3000);
