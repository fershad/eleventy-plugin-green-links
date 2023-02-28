const greenLinks = require('./lib/greenLinks');

module.exports = {
  configFunction(eleventy, config = {}) {
    eleventy.addTransform('green-links', greenLinks(config));
  },
};