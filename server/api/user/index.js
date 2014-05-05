'use strict';

var express = require('express');
var controller = require('./user.controller');
var fixture = require('./user.fixture');
var jwt = require('express-jwt');
var config = require('../../config/settings');
var access = require('../../config/access');

var router = express.Router();

// middleware that authenticates user and makes it available as req.user
var auth = jwt({ secret: config.secrets.session});

router.get('/', auth, access('admin'), controller.index);
router.delete('/:id', auth, access('admin'), controller.destroy);
router.get('/me', auth, controller.me);
router.put('/:id/password', auth, controller.changePassword);
router.get('/:id', auth, controller.show);
router.post('/', controller.create);

module.exports = router;
