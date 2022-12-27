const requestValidatorMiddleware = require('./request-validator.middleware');

module.exports = function createRequestValidator(rule) {
  return [rule, requestValidatorMiddleware];
};
