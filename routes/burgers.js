'use strict';

var express = require('express');
var router  = express.Router({ mergeParams: true });
var burgersController = require('../controllers/burgers');


router.route('/random')
  .get(burgersController.read_a_random_burger);


router.route('/:burger_id')
  .get(burgersController.read_a_burger)
  .delete(burgersController.delete_a_burger)
  .put(burgersController.update_a_burger);


router.route('/:burger_name?')
  .get(burgersController.list_all_burgers)
  .post(burgersController.create_a_burger);


module.exports = router;
