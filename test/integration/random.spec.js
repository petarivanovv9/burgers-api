'use strict';

var mongoose = require('mongoose');

var request = require('supertest');
var app     = require('../../index');

var mongoose = require('mongoose');
var Burger = require('../../models/burger');

var chai     = require('chai');
var expect   = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);


function create_some_number_of_burgers(number_of_burgers) {
  var i;
  for (i = 0; i < 30; i++) {
    var burger = new Burger({
      name: "testing_" + i,
      description: "testing /burgers" + i
    });
    burger.save();
  }
}


describe('/api/v1/burgers/random', function() {

  beforeEach((done) => {
    Burger.remove({}, (err) => {
      done();
    });
  });

  after((done) => {
    Burger.remove({}, (err) => {
      done();
    });
  });

  it('should return one burger at random', function(done) {

    create_some_number_of_burgers(3);

    request(app)
      .get('/api/v1/burgers/random')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.any.keys('_id', 'name', 'description');
        done();
      });
  });
});
