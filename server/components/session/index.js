'use strict';

var express = require('express');
var controller = require('./session.controller');

var router = express.Router();

router.post('/', controller.login);
router.delete('/', controller.logout);

module.exports = router;