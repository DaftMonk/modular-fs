'use strict';

angular.module('ngApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.currentUser = Auth.currentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });