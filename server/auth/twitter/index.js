'use strict';

var express = require('express');
var passport = require('passport');
var accessToken = require('../access-token.controller');

var router = express.Router();

router
  .get('/', passport.authenticate('twitter', {
    failureRedirect: '/signup',
    session: false
  }))

  .get('/callback', passport.authenticate('twitter', {
    failureRedirect: '/signup',
    session: false
  }), accessToken.setToken);

module.exports = router;