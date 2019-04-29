const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(config) {

  // A useful way to reference to the contect we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  var hljs = require('highlight.js'); // https://highlightjs.org/

  // Actual default values
  var md = require('markdown-it')({
    html: true,
    breaks: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
                 hljs.highlight(lang, str, true).value +
                 '</code></pre>';
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });

  config.setLibrary("md", md);

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // Add some utiliuty filters
  config.addFilter("squash", require("./src/filters/squash.js") );
  config.addFilter("dateDisplay", (dateObj, format = "LLL d, y") => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc"
    }).toFormat(format);
  });
  config.addPlugin(pluginRss);

  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));


  // pass some assets right through
  config.addPassthroughCopy("./src/site/images");
  config.addPassthroughCopy("./src/site/school");
  config.addPassthroughCopy("./src/site/keybase.txt");

  // make the seed target act like prod
  env = (env=="seed") ? "prod" : env;
  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data/${env}`
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
