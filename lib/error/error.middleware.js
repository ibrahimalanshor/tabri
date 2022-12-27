const { HttpException } = require('../exceptions');

module.exports = function errorMiddleware(config = {}) {
  return (err, req, res, next) => {
    if (err instanceof HttpException) {
      return res.status(err.status).json({
        status: err.status,
        name: req.polyglot.t(`http.${err.status}`),
        message: err.message
          ? typeof err.message === 'object'
            ? req.polyglot.t(err.message.key, err.message.args)
            : req.polyglot.t(err.message)
          : req.polyglot.t(`http.${err.status}`),
        errors: err.errors,
      });
    }

    if (config.debug ?? true) {
      console.log(err);
    }

    return res.status(500).json({
      status: 500,
      name: req.polyglot.t('http.500'),
    });
  };
};
