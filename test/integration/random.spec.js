'use strict';

var request = require('supertest');
var app     = require('../../index');

var chai     = require('chai');
var expect   = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('/api/v1/burgers/random', function() {
  it('should return one burger at random', function(done) {
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
