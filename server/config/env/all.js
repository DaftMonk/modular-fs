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
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'http://localhost:9000/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_ID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://localhost:9000/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:9000/auth/google/callback'
  }
};