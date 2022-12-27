const assert = require('assert');
const request = require('supertest');
const { body } = require('express-validator');
const tabri = require('../');
const server = require('./resources/server.js');

describe('request validator', function () {
  before(function () {
    this.server = server({
      routes: tabri.createRouter([
        {
          path: '/request-validator',
          method: 'post',
          handler: [
            tabri.createRequestValidator([
              body('name').isString().withMessage('validation.string'),
            ]),
            (req, res, next) => res.json(req.body),
          ],
        },
      ]),
    });

    this.server.run(() => {});
  });

  after(function () {
    this.server.stop();
  });

  it('should return create request validator function', function () {
    assert.equal(typeof tabri.createRequestValidator, 'function');
  });

  it('should return validation error', function (done) {
    request('http://localhost:5000')
      .post('/request-validator')
      .expect(422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.equal(typeof res.body.errors, 'object');
        assert.equal(res.body.errors.name.param, 'name');

        done();
      });
  });

  it('should return only field in rules', function (done) {
    request('http://localhost:5000')
      .post('/request-validator')
      .send({ name: 'test', danger: 'value' })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.equal(res.body.name, 'test');
        assert.equal(Object.keys(res.body).length, 1);

        done();
      });
  });
});
