const { name } = require("./package.json");
let newrelicAppName = process.env.MONITORING_NAME || name;
const license_key = process.env.NEW_RELIC_LICENSE_KEY;

exports.config = {
  app_name: [newrelicAppName],
  license_key,
  logging: { level: "info" },
  allow_all_headers: true,
  attributes: {
    exclude: [
      "request.headers.cookie",
      "request.headers.authorization",
      "request.headers.proxyAuthorization",
      "request.headers.setCookie*",
      "request.headers.x*",
      "response.headers.cookie",
      "response.headers.authorization",
      "response.headers.proxyAuthorization",
      "response.headers.setCookie*",
      "response.headers.x*",
    ],
  },
};
