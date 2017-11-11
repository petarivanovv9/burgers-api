'use strict';

var express = require('express'),
    app     = express(),
    router  = express.Router();

var bodyParser       = require('body-parser'),
    expressValidator = require('express-validator'),
    helmet           = require('helmet'),
    mongoose         = require('mongoose');

var config = require('./config');

var useCors   = require('./helpers/cors'),
    rateLimit = require('./helpers/rate_limit'),
    sentry    = require('./helpers/sentry');
var { errorHandler, notFoundError } = require('./helpers/error_handler');

var burgersRoutes = require('./routes/burgers');


mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URL, {
  useMongoClient: true,
});

app.use(sentry.reqHandler());

// using helmet to secure the express app by setting various HTTP headers
app.use(helmet());
// express middleware for string validation
app.use(expressValidator());

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

var port = process.env.PORT || 3000;


app.use('/api/v1/burgers', useCors(), rateLimit, burgersRoutes);
app.use('*', (req, res, next) => next(notFoundError("No endpoint found that matches " + req.originalUrl)));

app.use(sentry.errHandler());

app.use(errorHandler);


app.listen(port, function(err) {
  if (err) throw err;

  console.log("Server is listening...");
  console.log("pid is " + process.pid);
});


module.exports = app
