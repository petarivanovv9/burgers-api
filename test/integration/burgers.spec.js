'use strict';

var request = require('supertest');
var app     = require('../../index');

var mongoose = require('mongoose');
var Burger = require('../../models/burger');

var chai     = require('chai');
var expect   = chai.expect;
var should   = chai.should();
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

describe('/GET burgers -> /api/v1/burgers', function() {

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

  it('should return 25 burgers by default', function(done) {

    create_some_number_of_burgers(30);

    request(app)
      .get('/api/v1/burgers')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(25);
        done();
      });
  });

  it('should return a burger with name testing_1', function(done) {

    create_some_number_of_burgers(3);

    request(app)
      .get('/api/v1/burgers?burger_name=testing_1')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.any.keys('_id', 'name', 'description');
        done();
      });
  });

  it('should return 5 burgers per page', function(done) {

    create_some_number_of_burgers(7);

    request(app)
      .get('/api/v1/burgers?per_page=5')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(5);
        expect(res.body[0]).to.have.any.keys('_id', 'name', 'description');
        done();
      });
  });

  it('should return 3 burgers on page 2', function(done) {

    create_some_number_of_burgers(7);

    request(app)
      .get('/api/v1/burgers?per_page=3&page=2')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(3);
        expect(res.body[0]).to.have.any.keys('_id', 'name', 'description');
        done();
      });
  });

  it('should return a 400 validation error if incorrect param is passed', function(done) {
    request(app)
      .get('/api/v1/burgers?burger_name=')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.include({ statusCode: 400 });
        done();
      });
  });
});


describe('/POST burgers -> /api/v1/burgers', function() {

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

  it('should POST a burger', function(done) {

    var burger = new Burger({
      name: "testing",
      description: "testing POST"
    });

    request(app)
      .post('/api/v1/burgers')
      .send(burger)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Burger created!');
        expect(res.body.burger).to.have.any.keys('_id', 'name', 'description');
        done();
      });
  });
});
