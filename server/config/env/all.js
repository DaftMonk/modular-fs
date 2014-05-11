'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 9000,
  sampleData: true,
  secrets: {
    session: 'ng-secret'
  },
  userRoles: ['guest', 'user', 'admin'],
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  facebook: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:9000/auth/facebook/callback'
  },
  twitter: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:9000/auth/twitter/callback'
  },
  google: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:9000/auth/google/callback'
  }
};
