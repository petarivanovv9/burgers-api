'use strict';

var request = require('supertest');
var app     = require('../../index');

var chai     = require('chai');
var expect   = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('/api/v1/burgers/:id', function() {

  // SHOULD USE MOCK, sinon lib

  // get burger via :ID


  it('should return 404 if id doesn\'t match', function(done) {
    request(app)
      .get('/api/v1/burgers/5a02d4b515b9ad18970ea9fb')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(404);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include({ statusCode: 404 });
        done();
      });
  });

  it('should return 400 if invalid params are passed', function(done) {
    request(app)
      .get('/api/v1/burgers/9999999')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include({ statusCode: 400 });
        done();
      });
  });

});
