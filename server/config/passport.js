/**
 * Passport authentication strategies
 */

'use strict';

var User = require('../api/user/user.model');
var config = require('../config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

// Facebook Authentication
passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      User.findOne({
          'facebook.id': profile.id
      },
      function(err, user) {
          if (err) {
              return done(err);
          }
          if (!user) {
              user = new User({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  username: profile.username,
                  provider: 'facebook',
                  facebook: profile._json
              });
              user.save(function(err) {
                  if (err) console.log(err);
                  return done(err, user);
              });
          } else {
              return done(err, user);
          }
      })
  }
));

//Use twitter strategy
passport.use(new TwitterStrategy({
      consumerKey: config.twitter.clientID,
      consumerSecret: config.twitter.clientSecret,
      callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
      User.findOne({
          'twitter.id_str': profile.id
      }, function(err, user) {
          if (err) {
              return done(err);
          }
          if (!user) {
              user = new User({
                  name: profile.displayName,
                  username: profile.username,
                  provider: 'twitter',
                  twitter: profile._json
              });
              user.save(function(err) {
                  if (err) console.log(err);
                  return done(err, user);
              });
          } else {
              return done(err, user);
          }
      });
  }
));

//Use google strategy
passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      User.findOne({
          'google.id': profile.id
      }, function(err, user) {
          if (!user) {
              user = new User({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  username: profile.username,
                  provider: 'google',
                  google: profile._json
              });
              user.save(function(err) {
                  if (err) console.log(err);
                  return done(err, user);
              });
          } else {
              return done(err, user);
          }
      });
  }
));

module.exports = passport;
