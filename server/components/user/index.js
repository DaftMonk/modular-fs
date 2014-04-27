'use strict';

var express = require('express');
var controller = require('./user.controller');
var jwt = require('express-jwt');
var config = require('../../config/settings');

var router = express.Router();

// middleware that authenticates user and makes it available as req.user
var auth = jwt({ secret: config.secret});

router.get('/me', auth, controller.me);
router.put('/:id/password', auth, controller.changePassword);
router.get('/:id', auth, controller.show);
router.post('/', controller.create);

module.exports = router;
