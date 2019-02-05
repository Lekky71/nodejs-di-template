const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const app = require('../index');

const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Triangle Test Suite', () => {
  it('should return isosceles as triangle type', (done) => {
    chai.request(app)
      .get('/triangle?a=30.60&b=30.90&c=30.90')
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(200);
        expect(res.body)
          .to
          .have
          .property('message');
        expect(res.body.data.type)
          .to
          .equal('Isosceles');
        done();
      });

  });

  it('should return bad request server code 400 as param a is not in request', (done) => {
    chai.request(app)
      .get('/triangle?b=30.90&c=30.90')
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(400);
        expect(res.body)
          .to
          .have
          .property('message');
        done();
      });

  });

  it('should return bad request server code 400 as param b has the wrong data type', (done) => {
    chai.request(app)
      .get('/triangle?a=50.45&b=yo&c=30.90')
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(400);
        expect(res.body)
          .to
          .have
          .property('message');
        done();
      });

  });

});
