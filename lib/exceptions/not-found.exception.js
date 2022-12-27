const HttpException = require('./http.exception');
const { extendPrototype } = require('../helpers');

function NotFound(errors, msg) {
  HttpException.call(this, 404, errors, msg);
}

extendPrototype(NotFound, HttpException);

module.exports = NotFound;
