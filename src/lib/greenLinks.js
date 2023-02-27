const { parseHTML } = require('linkedom');
const { hosting } = require('@tgwf/co2');
/**
 * Finds unsafe anchor tags and adds safer attributes
 * @param html The HTML string
 * @returns The parsed HTML with green checked anchor tags
 */
const greenLinks = async (html) => {
  const { document } = parseHTML(html);
  const links = [...document.querySelectorAll('a')];

  if (links.length > 0) {
      //   Get all unique hostnames from the links
      const allValidLinks = links.filter((link) => /^(https?\:\/\/|\/\/)/i.test(link.href));
      const uniqueHostnames = [...new Set(allValidLinks.map((link) => new URL(link.href).hostname))];

        //   Check if the hostnames are green
        const greenHostnames = await hosting.check(uniqueHostnames);

        //   Add the green attribute to the links
        allValidLinks.forEach((link) => {
            const hostname = new URL(link.href).hostname;
            if (greenHostnames.includes(hostname)) {
                link.setAttribute('data-green-link', 'true');
            } else {
                link.setAttribute('data-green-link', 'false');
            }
        });
  } else {
    return html;
  }
  return document.toString();
};

module.exports = greenLinks;