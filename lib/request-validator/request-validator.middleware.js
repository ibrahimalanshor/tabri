const { validationResult, matchedData } = require('express-validator');
const { UnprocessableEntityException } = require('../exceptions');

module.exports = (req, res, next) => {
  try {
    validationResult(req).throw();

    req.body = matchedData(req, { locations: ['body'] });

    next();
  } catch (err) {
    next(
      new UnprocessableEntityException(
        Object.fromEntries(
          Object.entries(err.mapped()).map(([path, error]) => [
            path,
            {
              ...error,
              msg: req.polyglot.t(error.msg, { path: error.param }),
            },
          ])
        )
      )
    );
  }
};
