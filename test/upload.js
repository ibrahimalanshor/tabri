const assert = require('assert');
const request = require('supertest');
const tabri = require('../');
const server = require('./resources/server.js');

describe('upload', function () {
  before(function () {
    const storage = tabri.createStorage({
      field: 'file',
      allowedExtension: ['.png'],
      getPath: () => __dirname + '/resources/public',
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

  it('should return validation file extension error', function (done) {
    request('http://localhost:5000')
      .post('/upload')
      .attach('file', __dirname + '/resources/uploads/test.json')
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.equal(res.body.message, 'file not supported');

        done();
      });
  });

  it('should success upload file', function (done) {
    request('http://localhost:5000')
      .post('/upload')
      .attach('file', __dirname + '/resources/uploads/image.png')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.equal(res.body.filename, 'upload.png');

        done();
      });
  });
});
