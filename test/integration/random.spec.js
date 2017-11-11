'use strict';

var helper = require('../helper');

chai.use(chaiHttp);


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

    helper.create_some_number_of_burgers(3);

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

  it('should return a 404 object', function(done) {
    request(app)
      .get('/api/v1/burgers/random')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(404);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').eql('No burger found');
        expect(res.body).to.include({ statusCode: 404 });
        done();
      });
  });
});
