'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router
  .get('/', controller.index)
  .get('/:id', controller.show)
  .post('/', controller.create)
  .put('/:id', controller.update)
  .patch('/:id', controller.update)
  .delete('/:id', controller.destroy);

module.exports = router;