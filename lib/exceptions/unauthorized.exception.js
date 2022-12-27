const HttpException = require('./http.exception');
const { extendPrototype } = require('../helpers');

function Unauthorized(errors, msg) {
  HttpException.call(this, 401, errors, msg);
}

extendPrototype(Unauthorized, HttpException);

module.exports = Unauthorized;
