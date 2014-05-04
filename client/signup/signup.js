'use strict';

angular.module('ngApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'signup/signup.html',
        controller: 'SignupCtrl'
      });
  });
