'use strict';

var RateLimit = require('express-rate-limit');

var rateLimit = new RateLimit({
  windowMs: 3600000, // 1 hour in milliseconds
  max: 3600,
  delayMs: 0,
});


module.exports = rateLimit;
