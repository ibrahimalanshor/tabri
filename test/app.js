const assert = require('assert');
const request = require('supertest');
const tabri = require('../');

describe('app', function () {
  it('should be callable', function () {
    assert.equal(typeof tabri, 'function');
  });

  it('should return app', function () {
    const server = tabri();

    assert.equal(typeof server, 'object');
  });

  it('should return port from constructor config', function () {
    const server = tabri({ port: 5000 });

    assert.equal(server.app.get('port'), 5000);
  });

  it('should run app', function (done) {
    const server = tabri({
      port: 5000,
      logging: false,
    });

    server.run(() => {});

    request('http://localhost:5000').get('/').expect(404, done);
  });
});
