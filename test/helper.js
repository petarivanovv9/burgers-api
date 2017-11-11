'use strict';

var request = require('supertest');
var app     = require('../index');

var mongoose = require('mongoose');
var Burger = require('../models/burger');

var chai     = require('chai');
var expect   = chai.expect;
var should   = chai.should();
var chaiHttp = require('chai-http');


exports.create_some_number_of_burgers = function(number_of_burgers) {
  var i;
  for (i = 0; i < number_of_burgers; i++) {
    var burger = new Burger({
      name: "testing_" + i,
      description: "testing /burgers" + i
    });
    burger.save();
  }
};


global.request = request;
global.app     = app;

global.mongoose = mongoose;
global.Burger   = Burger;

global.chai     = chai;
global.expect   = expect;
global.should   = should;
global.chaiHttp = chaiHttp;
