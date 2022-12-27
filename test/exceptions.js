const { Router } = require('express');
const assert = require('assert');
const request = require('supertest');
const tabri = require('../');
const server = require('./resources/server.js');

describe('exceptions', function () {
  before(function () {
    const router = Router();

    router.get('/protected', (req, res) => {
      throw new tabri.exceptions.UnauthorizedException();
    });

    this.server = server({ routes: router });

    this.server.run(() => {});
  });

  it('should returns exception list', function () {
    assert.equal(typeof tabri.exceptions, 'object');
  });

  it('should returns 401 with translated message', function (done) {
    request('http://localhost:5000')
      .get('/protected')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.equal(res.body.status, 401);
        assert.equal(res.body.name, 'Unauthorized');
        assert.equal(res.body.message, 'Unauthorized');

        done();
      });
  });
});
