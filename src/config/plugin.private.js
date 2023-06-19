// When using `addGlobalData` and you *want* to return a function, you must nest functions like this.
// `addGlobalData` acts like a global data file and runs the top level function it receives.
const getPermalink = () => data =>
  // Always skip during non-watch/serve builds
  !process.env.BUILD_PRIVATE ? false : data.permalink;

// When using `addGlobalData` and you *want* to return a function, you must nest functions like this.
// `addGlobalData` acts like a global data file and runs the top level function it receives.
const getExcludeFromCollections = () => data =>
  // Always exclude from non-watch/serve builds
  !process.env.BUILD_PRIVATE ? true : data.eleventyExcludeFromCollections;

module.exports = config => {
  config.addGlobalData('eleventyComputed.permalink', getPermalink);
  config.addGlobalData('eleventyComputed.eleventyExcludeFromCollections', getExcludeFromCollections);

  let logged = false;

  config.on('eleventy.before', ({ runMode }) => {
    const isLocalBuild = runMode === 'watch' || runMode === 'serve';

    process.env.BUILD_PRIVATE = isLocalBuild ? true : false;

    // Only log once
    if (!logged) {
      console.log(`[ooloth/michaeluloth.com] ${isLocalBuild ? 'Including' : 'Excluding'} private notes.`);
      logged = true;
    }
  });
};