'use strict';

var express = require('express');
var router  = express.Router({ mergeParams: true});
var Burger  = require('../models/burger');


router.route('/burgers')

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

router.route('/burgers/:burger_id')

  .get(function(req, res) {
    var burger_id = req.params.burger_id;
    Burger.findById(burger_id, function(err, burger) {
      if (err)
        res.send(err);

      res.json(burger);
    });
  });


module.exports = router;
