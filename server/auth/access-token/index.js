'use strict';

var express = require('express');
var controller = require('./access-token.controller');

var router = express.Router();

router.post('/', controller.authenticate);

module.exports = router;
