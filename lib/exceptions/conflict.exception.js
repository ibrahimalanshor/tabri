const HttpException = require('./http.exception');
const { extendPrototype } = require('../helpers');

function Conflict(errors, msg) {
  HttpException.call(this, 409, errors, msg);
}

extendPrototype(Conflict, HttpException);

module.exports = Conflict;
