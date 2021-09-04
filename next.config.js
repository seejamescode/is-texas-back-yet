const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy()(
  withPWA({
    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
      runtimeCaching,
    },
    reactStrictMode: true,
  })
);
