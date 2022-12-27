const { Router } = require('express');
const assert = require('assert');
const request = require('supertest');
const tabri = require('../');
const server = require('./resources/server.js');

describe('app', function () {
  before(function () {
    const router = Router();

    router.get('/test', (req, res) => res.json(req.polyglot.t('test')));
    router.get('/error', (req, res) => {
      throw new Error();
    });

    this.server = server({ routes: router });

    this.server.run(() => {});
  });

  after(function () {
    this.server.stop();
  });

  it('should be callable', function () {
    assert.equal(typeof tabri, 'function');
  });

  it('should return app', function () {
    assert.equal(typeof this.server, 'object');
  });

  it('should return port from constructor config', function () {
    assert.equal(this.server.app.get('port'), 5000);
  });

  it('should run app', function (done) {
    request('http://localhost:5000')
      .get('/')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should serves static files', function (done) {
    request('http://localhost:5000')
      .get('/public/test.txt')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should returns translated message', function (done) {
    request('http://localhost:5000')
      .get('/test')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.equal(res.body, 'Hello World');

        done();
      });
  });

  it('should returns route responds', function (done) {
    request('http://localhost:5000')
      .get('/test')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should returns 500 error', function (done) {
    request('http://localhost:5000')
      .get('/error')
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.equal(res.body.status, 500);

        done();
      });
  });
});
