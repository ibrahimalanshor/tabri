const path = require('path');
const multer = require('multer');
const { BadRequestException } = require('../exceptions');

module.exports = function createStorage({
  field,
  allowedExtension,
  getPath,
  getFilename,
}) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, getPath(req, file));
    },
    filename: function (req, file, cb) {
      cb(null, getFilename(req, file));
    },
  });

  function fileFilter(req, file, cb) {
    if (!allowedExtension.includes(path.extname(file.originalname))) {
      cb(
        new BadRequestException(
          {},
          { key: 'validation.mime', args: { path: file.fieldname } }
        )
      );
    }

    cb(null, true);
  }

  return multer({ fileFilter, storage }).single(field);
};
