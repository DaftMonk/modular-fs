'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Returns a list of component files with a matching extension
 */
function byExt(root, ext) {
  var files = fs.readdirSync(root);
  var output = [];

  output = files.filter(function(file) {
    return fs.statSync(path.join(root, file)).isDirectory();
  }).map(function (file) {
    return path.join(path.join(root, file), file + ext);
  }).filter(function (file) {
    return fs.existsSync(file) && fs.statSync(file).isFile();
  });

  return output;
}

/**
 * Exposing the byExt function
 */
exports.byExt = byExt;