'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config');
var jwt = require('jsonwebtoken');

/**
 * Authenticate user and return an access token
 */
exports.authenticate = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);

    req.logIn(user, function(err) {
      if (err) return res.send(err);

      var token = jwt.sign(req.user, config.secret, { expiresInMinutes: 60*5 });
      res.json({ token: token });
    });
  })(req, res, next);
};
