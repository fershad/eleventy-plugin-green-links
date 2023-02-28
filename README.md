# Eleventy Plugin: Green Links

An Eleventy plugin which checks if links on a website are hosted on verified green hosting providers from [The Green Web Foundation's](https://www.thegreenwebfoundation.org/) Green Web dataset.

## What is a Green Web Host?

Verified green hosting providers are organisations that can demonstrate they are taking steps to avoid, reduce or offset the greenhouse gas emissions caused by using electricity to provide their services. They provide evidence to The Green Web Foundation to show that they do this on a yearly basis, or better.

## Why does Green Web hosting matter?

Choosing a green web host for a website is one of the most impactful decisions any website owner can make. Based on peer-reviewed research, the Sustainable Web Design model says hosting accounts for [15% of a website’s total energy usage](https://sustainablewebdesign.org/calculating-digital-emissions/). Beyond making your own site more sustainable, it also sends a message to other hosting providers that their potential customers value services that are powered by renewable energy.

## Installation

The plugin is available on npm. Install it as a dev dependency in your Eleventy project.

```shell
npm install eleventy-plugin-green-links --save-dev
```

Then add the plugin in your `.eleventy.js` configuration file.

```js
const greenLinks = require("eleventy-plugin-green-links");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(greenLinks);
};
```

## Usage

You can use the plugin as it is if you've followed the installation steps. However, if you want to ignore one or more domains you can pass a config object when initialising the plugin.

```js
// .eleventy.js
eleventyConfig.addPlugin(greenLinks, {
  ignore: ["fershad.com", "thegreenwebfoundation.org"],
});
```

### Config object

<table>
    <thead>
        <tr>
            <th>name</th>
            <th>type</th>
            <th>required</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>ignore</td>
            <td>array</td>
            <td>optional</td>
            <td>An array of domain names as strings.</td>
        </tr>
    </tbody>
</table>

## How it works

1. This transform goes through each page of an Eleventy site, and checks for valid external links.
2. It then gets all the unique domain names of those links & uses [CO2.js](https://github.com/thegreenwebfoundation/co2.js) to check them against The Green Web Foundation's Green Web dataset.
3. The Green Web dataset returns an array of all checked the domains hosted on known green web hosts.
4. All links hosted on green domains then have the `data-green-link="true"` attribute added to them.

### Highlighting green links

Since all green hosted links now have a `data-green-link="true"` attribute, you can target that using CSS to apply some custom styles to those links. An example below, which puts a teal coloured wavy underline on those links. You can also see it in action on my personal website: [fershad.com](https://fershad.com).

```css
a[data-green-link="true"] {
  text-decoration: underline wavy 2px teal;
}
```
