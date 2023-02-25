import { parseHTML } from 'linkedom';
import { hosting } from '@tgwf/co2'

/**
 * Finds unsafe anchor tags and adds safer attributes
 * @param html The HTML string
 * @returns The parsed HTML with green checked anchor tags
 */
const greenLinks = (html) => {
  const { document } = parseHTML(html);
  const links = [...document.querySelectorAll('a')];

  if (links.length > 0) {
    links.map((link) => {
      if (/^(https?\:\/\/|\/\/)/i.test(link.href)) {
        // Get the hostname from the link
        const hostname = new URL(link.href).hostname;
        hosting.check(hostname).then((result) => {
            if (result) {
                link.setAttribute('data-green-link', 'true');
            } else {
                link.setAttribute('data-green-link', 'false');
            }
        });     
      }
      return link;
    });
  } else {
    return html;
  }
  return document.toString();
};

module.exports = greenLinks;