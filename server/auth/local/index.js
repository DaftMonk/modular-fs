'use strict';

var express = require('express');
var passport = require('passport');
var accessToken = require('../access-token.controller');

var router = express.Router();

router.post('/', accessToken.authenticate);

module.exports = router;