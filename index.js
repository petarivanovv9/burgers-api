'use strict';


var express    = require('express'),
    app        = express(),
    router     = express.Router(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    config     = require('./config'),
    rateLimit  = require('./lib/rate_limit'),
    useCors    = require('./lib/cors');
var sentry     = require('./lib/sentry');
var { errorHandler, notFoundError } = require('./lib/error_handler');

var burgersRoutes = require('./routes/burgers');


mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URL, {
  useMongoClient: true,
});

app.use(sentry.reqHandler());

// TODO: documentation for the next 2 lines
app.use(require('helmet')());
app.use(require('express-validator')());

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
