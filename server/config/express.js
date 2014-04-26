'use strict';

var express = require('express');
var favicon = require('static-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var errorHandler = require('errorhandler');
var path = require('path');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('./');

/**
 * Express configuration
 */
module.exports = function(app) {
  var env = app.get('env');

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());

    // Disable caching of scripts
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('.js') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
  }

  if ('production' === env) {
    app.use(compression());
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
  }

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(passport.initialize());
  app.use(cookieParser());

  // Error handler - has to be last
  if ('development' === app.get('env')) {
    app.use(errorHandler());
  }
};
