'use strict';

var request = require('supertest');
var app     = require('../../index');

var chai     = require('chai');
var expect   = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('/api/v1/burgers', function() {
  it('should return 25 burgers by default', function(done) {
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

  // for beer_name

  // for per_page

  // for page

  // create burger

  it('should return a 400 validation error if incorrect param is passed', function(done) {
    request(app)
      .get('/api/v1/burgers?burger_name=')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include({ statusCode: 400 });
        done();
      });
  });
});
