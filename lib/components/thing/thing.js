'use strict';

var ctrl = require('./thing-controller');

module.exports = function(app) {
  app.route('/api/awesomeThings')
    .get(ctrl.awesomeThings);
};