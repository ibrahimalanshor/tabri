const tabri = require('../../index.js');

module.exports = function ({ routes }) {
  return tabri({
    port: 5000,
    logging: false,
    debug: false,
    static: {
      path: '/public',
      dir: __dirname + '/static',
    },
    i18n: {
      messages: require('./messages'),
      defaultLocale: 'en',
    },
    routes: [routes],
  });
};
