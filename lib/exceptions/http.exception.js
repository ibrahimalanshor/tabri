function HttpException(status, errors, msg) {
  this.status = status;
  this.errors = errors;
  this.msg = msg;
}

module.exports = HttpException;
