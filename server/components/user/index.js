'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/me', controller.me);
router.put('/:id/password', controller.changePassword);
router.get('/:id', controller.show);
router.post('/', controller.create);

module.exports = router;