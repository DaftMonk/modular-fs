'use strict';

angular.module('ngApp')
  .factory('Auth', function Auth($location, $rootScope, Session, User, $cookieStore) {

    var currentUser = $cookieStore.get('token') ? User.get() : {};

    return {

      /**
       * Authenticate user
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;

        return Session.save({
          email: user.email,
          password: user.password
        }, function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          return cb();
        }, function(err) {
          $cookieStore.remove('token');
          currentUser = {};
          return cb(err);
        }).$promise;
      },

      /**
       * Unauthenticate user
       *
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      logout: function(callback) {
        var cb = callback || angular.noop;

        return Session.delete(function() {
            $cookieStore.remove('token');
            return cb();
          },
          function(err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            currentUser = {};
            return cb(err);
          }).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.update({
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      currentUser: currentUser,

      /**
       * Simple check to see if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        var userToken = $cookieStore.get('token');
        return !!userToken;
      },
    };
  });