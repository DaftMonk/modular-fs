/**
 * Load configuration based on node environment
 * Environment specific settings will overide 'all' settings
 */

'use strict';

var _ = require('lodash');

module.exports = _.merge(
    require('./env/all.js'),
    require('./env/' + process.env.NODE_ENV + '.js') || {});
