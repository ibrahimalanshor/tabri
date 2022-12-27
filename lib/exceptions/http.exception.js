function HttpException(status, errors, msg) {
  this.status = status;
  this.errors = errors;
  this.message = msg;
}

module.exports = HttpException;
