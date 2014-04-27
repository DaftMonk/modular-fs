/**
 * Middleware to see if the user meets the minimum required role to access a route
 */

'use strict';

var User = require('../components/user/user.model');
var config = require('./settings');

module.exports = function(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return function(req, res, next) {
    User.findById(req.user._id, function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);

      if (config.userRoles.indexOf(user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.send(403);
      }
    });
  };
};
