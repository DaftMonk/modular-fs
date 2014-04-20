'use strict';

var load = require('../config/load'),
    path = require('path'),
    notFound = require('../config/404');

/**
 * Main application routes
 */
module.exports = function(app) {

  // Load all component route files
  load.byExt('./lib/components/', '.js').forEach(function(routeFile) {
    require(path.resolve(routeFile))(app);
  });

  // All undefined asset or api routes should return a 404
  app.route('/api/*')
    .get(notFound);
  app.route('/components/*')
    .get(notFound);
  app.route('/scripts/*')
    .get(notFound);
  app.route('/styles/*')
    .get(notFound);
  app.route('/bower_components/*')
    .get(notFound);
  app.route('/images/*')
    .get(notFound);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};