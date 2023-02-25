const greenLinks = require('./lib/greenLinks');

module.exports = (eleventyConfig) => {
  eleventyConfig.namespace('green-links', () => {
    eleventyConfig.addTransform('green-links', (content, outputPath) => {
      try {
        if (outputPath && outputPath.endsWith('.html')) {
          content = greenLinks.greenLinks(content);
        }
      } catch (error) {
        console.error(error);
      }
      return content;
    });
  });
};