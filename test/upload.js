const assert = require('assert');
const request = require('supertest');
const tabri = require('../');
const server = require('./resources/server.js');

describe('upload', function () {
  before(function () {
    const storage = tabri.createStorage({
      field: 'file',
      allowedExtension: ['.png'],
      getPath: () => __dirname + '/resources/uploads',
      getFilename: () => 'upload.png',
    });

    this.server = server({
      routes: tabri.createRouter([
        {
          path: '/upload',
          method: 'post',
          handler: [
            tabri.createUpload(storage, 'validation.file-required'),
            (req, res, next) => res.json(req.file),
          ],
        },
      ]),
    });

    this.server.run(() => {});
  });

  after(function () {
    this.server.stop();
  });

  it('should return create upload', function () {
    assert(typeof tabri.createUpload, 'function');
  });

  it('should return create storage', function () {
    assert(typeof tabri.createStorage, 'function');
  });

  it('should return 400 error', function (done) {
    request('http://localhost:5000')
      .post('/upload')
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.equal(res.body.message, 'file required');

        done();
      });
  });
});
