/**
 * Passport authentication strategies
 */

'use strict';

var User = require('../api/user/user.model');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User.findOne({
      email: email.toLowerCase()
    }, function(err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, { message: 'This email is not registered.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'This password is not correct.' });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;
