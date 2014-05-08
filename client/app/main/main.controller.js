'use strict';

angular.module('ngApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncCollection($scope.awesomeThings, 'thing');
    });

    $scope.addThing = function() {
      $http.post('/api/things', { name: 'socket.io', info: new Date().getTime() });
    };

    $scope.editThing = function() {
      $http.put('/api/things/' + $scope.awesomeThings[0]._id, { name: 'socket.io', info: new Date().getTime() });
    };

    $scope.deleteThing = function() {
      $http.delete('/api/things/' + $scope.awesomeThings[2]._id);
    };
  });