'use strict';

var Burger  = require('../models/burger');
var { notFoundError, validationError } = require('../lib/error_handler');

var schema_burger  = require('../schemas/burger');
var schema_burgers = require('../schemas/burgers');

var isEmpty = require('lodash/isEmpty');
var random  = require('lodash/random');


exports.list_all_burgers = function(req, res, next) {
  req.checkQuery(schema_burgers);

  var errors = req.validationErrors();


  if (are_all_params_valid(req.query))
    return next(validationError())

  if (errors)
    return next(validationError(errors));

  if ( ! req.query.burger_name ) {
    pagination(req, res);
  } else {
    read_a_burger_by_name(req, res, next);
  }
};


exports.create_a_burger = function(req, res) {
  var new_burger = new Burger(req.body);

  new_burger.save(function(err, burger) {
    if (err)
      res.send(err);

    res.status(200);
    res.json({ message: 'Burger created!', burger });
  });
};


exports.read_a_random_burger = function(req, res, next) {
  Burger.count().exec(function(err, count) {
    if (err)
      res.send(err);

    var random_number = random(0, count - 1);

    Burger.findOne().skip(random_number).exec(function(err, burger) {
      if (err || !burger) {
        next(notFoundError(`No burger found`));
      } else {
        res.status(200);
        res.json([burger]);
      }
    });
  });
};


exports.read_a_burger = function(req, res, next) {
  req.checkParams(schema_burger);

  var errors = req.validationErrors();

  if (errors)
    return next(validationError(errors));

  var burger_id = req.params.burger_id;
  Burger.findById(burger_id).exec(function(err, burger) {
    if (err || !burger) {
      next(notFoundError(`No burger found`));
    } else {
      res.status(200);
      res.json([burger]);
    }
  });
};


function read_a_burger_by_name(req, res, next) {
  var burger_name = req.query.burger_name;
  Burger.find({ "name": burger_name }, function(err, burger) {
    if (err || isEmpty(burger)) {
      next(notFoundError(`No burger found that matches the name ${burger_name}`));
    } else {
      res.status(200);
      res.json(burger);
    }
  });
}


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


function are_all_params_valid(req_query) {
  var req_query_size = Object.keys(req_query).length;
  var valid_params = ['burger_name', 'per_page', 'page'];
  var valid_params_size = valid_params.length;
  var counter = 0;

  for (var i = 0; i < valid_params_size; i++) {
    if (valid_params[i] in req_query)
      counter += 1;
  }

  return counter != req_query_size;
}
