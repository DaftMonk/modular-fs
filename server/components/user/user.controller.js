'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config');
var jwt = require('jsonwebtoken');

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err) {
    if (err) return res.json(400, err);
    req.logIn(newUser, function(err) {
      if (err) return next(err);

      var token = jwt.sign(req.user.id, config.secret, { expiresInMinutes: 60*5 });
      res.json({ token: token });
    });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);
    res.json(user.profile);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);
    res.json(user.profile);
  });
};
