'use strict';

var express = require('express');
var router  = express.Router({ mergeParams: true});
var Burger  = require('../models/burger');


router.route('/')

  .post(function(req, res) {

    var burger = new Burger();
    burger.name        = req.body.name;
    burger.description = req.body.description;
    burger.image_url   = req.body.image_url;
    burger.ingredients = req.body.ingredients;

    burger.save(function(err) {
      if (err)
        res.send(err);

      res.json(({ message: 'Burger created!' }));
    });

  })

  .get(function(req, res) {
    Burger.find(function(err, burgers) {
      if (err)
        res.send(err);

      res.json(burgers);
    });
  });


router.route('/random')

  .get(function(req, res) {
    Burger.count().exec(function(err, count) {
      if (err)
        res.send(err);

      // add LODASH LIB for random func
      var random = Math.floor(Math.random() * count);
      Burger.findOne().skip(random).exec(function(err, result) {
        if (err)
          res.send(err)

        res.json([result]);
      });
    });
  });


router.route('/:burger_id')

  .get(function(req, res) {
    var burger_id = req.params.burger_id;
    Burger.findById(burger_id, function(err, burger) {
      if (err)
        res.send(err);

      res.json([burger]);
    });
  });





module.exports = router;
