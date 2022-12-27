const HttpException = require('./http.exception');
const { extendPrototype } = require('../helpers');

function BadRequestException(errors, msg) {
  HttpException.call(this, 400, errors, msg);
}

extendPrototype(BadRequestException, HttpException);

module.exports = BadRequestException;
