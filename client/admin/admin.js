'use strict';

angular.module('ngApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'admin/admin.html',
        controller: 'AdminCtrl',
        authenticate: true
      });
  });
