'use strict';

var Burger  = require('../models/burger');


function pagination(req, res) {
  var { page, per_page } = req.query;

  var per_page    = per_page || 25;
  var page_number = page || 1;

  var parsed_per_page    = parseInt(per_page);
  var parsed_page_number = parseInt(page_number);

  var offset = (parsed_page_number - 1) * parsed_per_page;

  Burger.find({}, {}, { skip: offset, limit: parsed_per_page }, function(err, burgers) {
    if (err)
      res.send(err);

    res.status(200);
    res.json(burgers);
  });
}


module.exports = pagination;
