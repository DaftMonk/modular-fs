'use strict';

var path = require('path');
var _ = require('lodash');
var requiredProcessEnv = require('./helpers/required_env');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  sampleData: true,

  // Secret for session, should be unqiue
  secrets: {
    session: requiredProcessEnv('SESSION_SECRET')
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});