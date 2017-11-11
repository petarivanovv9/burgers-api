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

  it('it should GET a burger by the given id', function(done) {
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
