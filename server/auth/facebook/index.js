'use strict';

var express = require('express');
var passport = require('passport');
var accessToken = require('../access-token.controller');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), accessToken.setToken);

module.exports = router;