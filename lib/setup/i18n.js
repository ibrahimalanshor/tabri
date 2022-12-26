const Polyglot = require('node-polyglot');

module.exports = function setupI18n(app, config = {}) {
  app.use((req, res, next) => {
    const polyglot = new Polyglot();

    if (config.messages) {
      polyglot.extend(
        config.messages[req.locale.language] ??
          config.messages[config.defaultLocale]
      );
    }

    req.polyglot = polyglot;

    next();
  });
};
