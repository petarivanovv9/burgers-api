'use strict';

var helper = require('../helper');

chai.use(chaiHttp);


describe('/api/v1/random/non/existing/route', function() {
  it('should return a 404 object', function(done) {
    request(app)
      .get('/api/v1/random/non/existing/route')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(404);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include({ statusCode: 404 });
        done();
      });
  });
});
