const { BadRequestException } = require('../exceptions');

module.exports = function (multer, msg) {
  const validator = (req, res, next) => {
    if (!req.file) {
      throw new BadRequestException({}, msg);
    }

    next();
  };

  return [multer, validator];
};
