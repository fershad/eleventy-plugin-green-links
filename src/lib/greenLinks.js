const { parseHTML } = require('linkedom');
const { hosting } = require('@tgwf/co2');

function greenLinksSetup(config = {}) {
  const { ignore = [] } = config;

    /**
   * @param {string} content
   * @param {string} outputPath
   */

    return async function greenLinks(content, outputPath) {
        try {
            if (outputPath && outputPath.endsWith('.html')) {
              const { document } = parseHTML(content);
              const links = [...document.querySelectorAll('a')];
            
              if (links.length > 0) {
                  //   Get all unique hostnames from the links
                  const allValidLinks = links.filter((link) => /^(https?\:\/\/|\/\/)/i.test(link.href));
                  const uniqueHostnames = [...new Set(allValidLinks.map((link) => new URL(link.href).hostname))];

                  //   Remove the hostnames that should be ignored
                  ignore.forEach((hostname) => {
                      const ignoreHostnameIndex = uniqueHostnames.indexOf(hostname);
                  if (ignoreHostnameIndex > -1) {
                      uniqueHostnames.splice(ignoreHostnameIndex, 1);
                  }
                });
            
                    //   Check if the hostnames are green
                    const greenHostnames = await hosting.check(uniqueHostnames);
            
                    //   Add the green attribute to the links
                    allValidLinks.forEach((link) => {
                        const hostname = new URL(link.href).hostname;
                        if (greenHostnames.includes(hostname)) {
                            link.setAttribute('data-green-link', 'true');
                        } else if (!ignore.includes(hostname)) {
                            link.setAttribute('data-green-link', 'false');
                        }
                    });
              } else {
                return content;
              }
              return document.toString();
            }
        } catch (error) {
            console.error(error);
        }
        return content;
    }
}

module.exports = greenLinksSetup;