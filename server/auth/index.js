'use strict';

var express = require('express');
var passport = require('passport');
var user = require('../api/user/user.controller');
var accessToken = require('./access-token.controller');

var router = express.Router();

router.post('/access-token', accessToken.authenticate);

// Setting the Facebook oauth routes
router
  .get('/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    session: false
  }))

  .get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), accessToken.setToken);

// Setting the Twitter oauth routes
router
  .get('/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signup',
    session: false
  }))

  .get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signup',
    session: false
  }), accessToken.setToken);

// Setting the Google oauth routes
router
  .get('/google', passport.authenticate('google', {
    failureRedirect: '/signup',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    session: false
  }))

  .get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
  }), accessToken.setToken);

module.exports = router;
