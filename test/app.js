const assert = require('assert');
const tabri = require('../');

describe('app', function () {
  it('should be callable', function () {
    assert.equal(typeof tabri, 'function');
  });

  it('should return app', function () {
    const app = tabri();

    assert.equal(typeof app, 'object');
  });
});
