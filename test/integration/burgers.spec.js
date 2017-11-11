'use strict';

var helper = require('../helper');

chai.use(chaiHttp);


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

    helper.create_some_number_of_burgers(30);

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

    helper.create_some_number_of_burgers(3);

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

    helper.create_some_number_of_burgers(7);

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

    helper.create_some_number_of_burgers(7);

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
