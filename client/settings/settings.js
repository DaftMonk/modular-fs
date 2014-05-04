'use strict';

angular.module('ngApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/settings', {
        templateUrl: 'settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });