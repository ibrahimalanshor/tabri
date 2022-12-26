module.exports = function errorMiddleware(config = {}) {
  return (err, req, res, next) => {
    if (config.debug) {
      console.log(err);
    }

    return res.status(500).json({
      status: 500,
      name: req.polyglot.t('http.500'),
    });
  };
};
