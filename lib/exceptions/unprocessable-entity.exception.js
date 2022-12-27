const HttpException = require('./http.exception');
const { extendPrototype } = require('../helpers');

function UnprocessableEntity(errors, msg) {
  HttpException.call(this, 422, errors, msg);
}

extendPrototype(UnprocessableEntity, HttpException);

module.exports = UnprocessableEntity;
