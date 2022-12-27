const HttpException = require('./http.exception');
const { extendPrototype } = require('../helpers');

function Forbidden(errors, msg) {
  HttpException.call(this, 403, errors, msg);
}

extendPrototype(Forbidden, HttpException);

module.exports = Forbidden;
