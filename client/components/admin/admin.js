'use strict';

angular.module('ngApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'components/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
