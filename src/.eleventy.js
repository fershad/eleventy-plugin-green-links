const greenLinks = require('./lib/greenLinks');

const greenLinksPlugin = (eleventyConfig) => {
}

module.exports = (eleventyConfig) => {
    eleventyConfig.addTransform('green-links', async (content, outputPath) => {
        try {
          if (outputPath && outputPath.endsWith('.html')) {
            content = await greenLinks(content);
          }
        } catch (error) {
          console.error(error);
        }
        return content;
      });
    eleventyConfig.addPlugin(greenLinksPlugin);    
};