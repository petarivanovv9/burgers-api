'use strict';

var Raven = require('raven');
Raven.config('https://<key>@sentry.io/<project>').install();

function reqHandler() {
  return Raven.requestHandler()
}

function errHandler() {
  return Raven.errorHandler()
}


exports.reqHandler = reqHandler
exports.errHandler = errHandler
