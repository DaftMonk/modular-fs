'use strict';

angular.module('ngApp')
  .factory('Session', function ($resource) {
    return $resource('/api/sessions/');
  });
