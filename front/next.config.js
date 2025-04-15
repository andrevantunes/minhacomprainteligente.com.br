const withPWA = require("next-pwa");

/** @type {import("next").NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["digitalflux.store", "d21gq13m1q7xhx.cloudfront.net"],
  },
  pwa: {
    // TODO: Configurar melhor o PWA quando tivermos decidido mais sobre arquitetura
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    sw: "service-worker.js",
  }
};

if (process.env.NODE_ENV === "production" && process.env.NEW_RELIC_LICENSE_KEY) {
  require("newrelic");
}

module.exports = withPWA(nextConfig);
