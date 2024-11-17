const fs = require("fs");

/** @type {import("handlebars").HelperDelegate} */
module.exports = function (path) {
  const files = fs.readdirSync(path);
  const directories = files.filter(function (file) {
    return fs.statSync(`${path}/${file}`).isDirectory();
  });

  return directories;
};
