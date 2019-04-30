const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(config) {

  // Markdown configuration
  var hljs = require('highlight.js');
  var md = require('markdown-it')({
    html: true,
    breaks: false,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
                 hljs.highlight(lang, str, true).value +
                 '</code></pre>';
        } catch (__) {}
      }
      return md.utils.escapeHtml(str);
    }
  });
  config.setLibrary("md", md);

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // Utility Filters
  config.addFilter("squash", require("./src/filters/squash.js") );
  config.addFilter("dateDisplay", (dateObj, format = "LLL d, y") => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc"
    }).toFormat(format);
  });
  config.addPlugin(pluginRss);

  // Minify HTML
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // Assets
  config.addPassthroughCopy("./src/site/images");
  config.addPassthroughCopy("./src/site/school");
  config.addPassthroughCopy("./src/site/keybase.txt");

  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data`
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
