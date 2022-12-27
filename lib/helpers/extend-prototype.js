module.exports = (source, target) => {
  source.prototype = Object.create(target.prototype, {
    constructor: {
      value: source,
    },
  });
};
