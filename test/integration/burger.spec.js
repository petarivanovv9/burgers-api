'use strict';

var helper = require('../helper');

chai.use(chaiHttp);


describe('/GET burger -> /api/v1/burgers/:id', function() {

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

  it('should GET a burger by the given id', function(done) {
    var burger = new Burger({
      name: "testing",
      description: "testing GET by id"
    });
    burger.save(function(err, burger) {
      request(app)
        .get('/api/v1/burgers/' + burger.id)
        .send(burger)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
          res.body[0].should.have.property('_id').eql(burger.id);
          done();
        });
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

  it('should DELETE a burger by the given id', function(done) {
    var burger = new Burger({
      name: "testing",
      description: "testing GET by id"
    });
    burger.save(function(err, burger) {
      request(app)
        .delete('/api/v1/burgers/' + burger.id)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').eql('Burger deleted!');
          expect(res.body.burger).to.have.any.keys('_id', 'name', 'description');
          done();
        });
    });
  });

  it('should PUT a burger by the given id', function(done) {
    var burger = new Burger({
      name: "testing",
      description: "testing GET by id"
    });
    var updated_burger = new Burger({
      name: "updated_testing"
    })
    burger.save(function(err, burger) {
      request(app)
        .put('/api/v1/burgers/' + burger.id)
        .send(updated_burger)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').eql('Burger updated!');
          expect(res.body.burger).to.have.any.keys('_id', 'name', 'description');
          expect(res.body.burger).to.have.property('name').eql('updated_testing');
          done();
        });
    });
  });

  it('should return 404 if ID doesn\'t match', function(done) {
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
