'use strict';

var Boom = require('boom');

function validationError(validationErrors) {
  var error = Boom.badRequest('Invalid query params');
  error.output.payload.data = validationErrors;
  return error;
}

function notFoundError(msg) {
  return Boom.notFound(msg);
}

function tooManyRequestsError() {
  return Boom.tooManyRequests('You have reached your limit of requests on this IP address, so please wait an hour!');
}

function errorHandler(err, req, res, next) {
  // console.log(err);
  var boomError = Boom.boomify(err);
  if (boomError.isServer) {
    boomError.output.payload.message = 'Something went wrong on your server, so please try again!';
  }

  res.status(boomError.output.statusCode);
  res.send(boomError.output.payload);
}


module.exports = { errorHandler, notFoundError, validationError, tooManyRequestsError };
