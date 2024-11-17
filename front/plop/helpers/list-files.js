const fs = require("fs");

/** @type {import("handlebars").HelperDelegate} */
module.exports = function (path, pattern) {
  const files = getFiles(path);
  if (!pattern) return files;
  const directories = files.filter(function (file) {
    return pattern.test(file);
  });

  return directories;
};

function getFiles(dir, $files) {
  $files = $files || [];
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, $files);
    } else {
      $files.push(name);
    }
  }
  return $files;
}
