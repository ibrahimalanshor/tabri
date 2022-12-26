const assert = require('assert');
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
    const server = tabri(4000);

    assert.equal(server.app.get('port'), 4000);
  });
});
