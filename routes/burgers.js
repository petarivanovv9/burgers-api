'use strict';

var express = require('express');
var router  = express.Router({ mergeParams: true });
var Burger  = require('../models/burger');
var burgerController = require('../controllers/burger');


router.route('/')
  .get(burgerController.list_all_burgers)
  .post(burgerController.create_a_burger);


router.route('/random')
  .get(burgerController.read_a_random_burger);


router.route('/:burger_id')
  .get(burgerController.read_a_burger);


module.exports = router;
