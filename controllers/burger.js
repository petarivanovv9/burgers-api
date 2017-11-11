'use strict';

var Burger  = require('../models/burger');
var { notFoundError, validationError } = require('../helpers/error_handler');

var schema_burger  = require('../schemas/burger');
var schema_burgers = require('../schemas/burgers');

var isEmpty = require('lodash/isEmpty');
var random  = require('lodash/random');

var pagination = require('../helpers/pagination');
var are_all_params_valid = require('../helpers/validation');


// GET /burgers -> list all burgers
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


// POST /burgers -> create a burger
exports.create_a_burger = function(req, res) {
  var new_burger = new Burger(req.body);

  new_burger.save(function(err, burger) {
    if (err)
      res.send(err);

    res.status(200);
    res.json({ message: 'Burger created!', burger });
  });
};


// GET /burgers/:id -> read a burger by id
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


// DELETE /burgers/:id -> delete a burger by id



// UPDATE /burgers/:id -> update a burger by id



// GET /burgers/random -> read a random burger
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
