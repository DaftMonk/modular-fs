'use strict';

var errors = require('./config/errors');

/**
 * Main application routes
 */
module.exports = function(app) {

  // Use component routing
  app.use('/api/things', require('./components/thing'));
  app.use('/api/authenticate', require('./components/authenticate'));
  app.use('/api/users', require('./components/user'));

  // All undefined asset or api routes should return a 404
  app.route('/api/*')
    .get(errors[404]);
  app.route('/components/*')
    .get(errors[404]);
  app.route('/scripts/*')
    .get(errors[404]);
  app.route('/styles/*')
    .get(errors[404]);
  app.route('/bower_components/*')
    .get(errors[404]);
  app.route('/images/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
