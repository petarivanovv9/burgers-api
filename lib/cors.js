'use strict';

var cors = require('cors');

var corsOpts = {
  origin: '*',
  credentials: true,
  exposedHeaders: 'accept,content-length,content-type,origin,x-ratelimit-limit,x-ratelimit-remaining'
};

function userCors() {
  return cors(corsOpts);
}


module.exports = userCors;
