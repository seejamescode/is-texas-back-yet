const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");

module.exports = withCSS(
  withOffline({
    publicRuntimeConfig: {
      NODE_ENV: process.env.NODE_ENV // Pass through env variables
    }
  })
);
