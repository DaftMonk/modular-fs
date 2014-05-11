'use strict';

var express = require('express');
var passport = require('passport');
var accessToken = require('./access-token.controller');
var config = require('../config');
var User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./twitter/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/twitter', require('./twitter'));
router.use('/google', require('./google'));

module.exports = router;
