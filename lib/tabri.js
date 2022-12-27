const App = require('./app.js');

exports = module.exports = createApplication;

function createApplication(config) {
  const app = new App(config);

  return app;
}

exports.exceptions = require('./exceptions');
