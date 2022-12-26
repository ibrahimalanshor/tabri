const assert = require('assert');
const request = require('supertest');
const tabri = require('../');

describe('app', function () {
  before(function () {
    this.server = tabri({
      port: 5000,
      logging: false,
      static: {
        path: '/public',
        dir: __dirname + '/resources/static',
      },
      i18n: {
        messages: require('./resources/messages'),
        defaultLocale: 'en',
      },
    });

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
    this.server.app.get('/test', (req, res) =>
      res.json(req.polyglot.t('test'))
    );

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
});
