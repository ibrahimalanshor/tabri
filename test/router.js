const assert = require('assert');
const request = require('supertest');
const tabri = require('../');
const server = require('./resources/server.js');

describe('router', function () {
  before(function () {
    this.server = server({
      routes: tabri.createRouter([
        {
          path: '/router',
          method: 'get',
          handler: (req, res, next) => res.json('get route'),
        },
      ]),
    });

    this.server.run(() => {});
  });

  after(function () {
    this.server.stop();
  });

  it('should return create router function', function () {
    assert.equal(typeof tabri.createRouter, 'function');
  });

  it('should get a route', function () {
    request('http://localhost:5000')
      .get('/router')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.equal(res.body, 'get route');

        done();
      });
  });
});
