const { Router } = require('express');

module.exports = function createRouter(routes) {
  const router = Router();

  routes.forEach((route) => {
    router[route.method](route.path, route.handler);
  });

  return router;
};
