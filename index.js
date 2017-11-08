'use strict';


var express    = require('express'),
    app        = express(),
    router     = express.Router(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    config     = require('./config');

var burgersRoutes = require('./routes/burgers');


mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URL, {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;


app.use('/api/v1/burgers', burgersRoutes);



app.listen(port, function() {
  console.log("Server is listening...");
});
