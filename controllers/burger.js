'use strict';

var Burger  = require('../models/burger');
var { notFoundError, validationError } = require('../lib/error_handler');


exports.list_all_burgers = function(req, res, next) {

  req.checkQuery({
    burger_name: {
      errorMessage: 'Must have a value and if you are using multiple words use underscores to separate',
      optional: true,
      notEmpty: true
    }
  });

  var errors = req.validationErrors();

  if (errors) {
    return next(validationError(errors));
  }

  if ( ! req.query.burger_name ) {
    Burger.find({}, function(err, burgers) {
      if (err)
        res.send(err);

      res.status(200);
      res.json(burgers);
    });
  } else {
    read_a_burger_by_name(req, res);
  }
};


exports.create_a_burger = function(req, res) {
  var new_burger = new Burger(req.body);
  // new_burger.name        = req.body.name;
  // new_burger.description = req.body.description;
  // new_burger.image_url   = req.body.image_url;
  // new_burger.ingredients = req.body.ingredients;

  new_burger.save(function(err) {
    if (err)
      res.send(err);

    res.status(200);
    res.json({ message: 'Burger created!' });
  });
};


exports.read_a_random_burger = function(req, res) {
  Burger.count().exec(function(err, count) {
    if (err)
      res.send(err);

    // add LODASH LIB for random func
    var random = Math.floor(Math.random() * count);
    Burger.findOne().skip(random).exec(function(err, result) {
      if (err)
        res.send(err)

      res.status(200);
      res.json([result]);
    });
  });
};


exports.read_a_burger = function(req, res, next) {

  req.checkParams({
    burger_id: {
      errorMessage: 'burger_id must be a mongoID',
      isMongoId: function(id) {
        var ObjectId = require('mongoose').Types.ObjectId;
        return ObjectId.isValid(id);
      }
    }
  });

  var errors = req.validationErrors();

  if (errors) {
    return next(validationError(errors));
  }

  var burger_id = req.params.burger_id;
  Burger.findById(burger_id, function(err, burger) {
    if (err)
      next(notFoundError(`No burger found that matches the ID ${burger_id}`));

    res.status(200);
    res.json([burger]);
  });
};


function read_a_burger_by_name(req, res) {
  var burger_name = req.query.burger_name;
  Burger.find({ "name": burger_name }, function(err, burger) {
    if (err)
      res.send(err);

    res.status(200);
    res.json(burger);
  });
}
