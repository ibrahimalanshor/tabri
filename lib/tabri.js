const App = require('./app.js');

exports = module.exports = createApplication;

function createApplication(config) {
  const app = new App(config);

  return app;
}

exports.exceptions = require('./exceptions');
exports.createRouter = require('./router/router.js');
exports.createRequestValidator = require('./request-validator/request-validator.js');
exports.createUpload = require('./upload/upload.js');
exports.createStorage = require('./upload/storage.js');
