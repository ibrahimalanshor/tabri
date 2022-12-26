const App = require('./app.js');

exports = module.exports = createApplication;

function createApplication() {
  const app = new App();

  return app;
}
