'use strict';


var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    config     = require('./config');


mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URL, {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
  res.json({ message: 'Welcome to the burgers api!' });
  console.log('hello world');
});



app.listen(3000, function() {
  console.log("Server is listening...");
});
