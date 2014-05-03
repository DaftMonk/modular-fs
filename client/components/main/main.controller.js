'use strict';

angular.module('ngApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
