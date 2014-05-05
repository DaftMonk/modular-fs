'use strict';

angular.module('ngApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    socket.on('thing:save', function(thing) {
      var old = _.find($scope.awesomeThings, { _id: thing._id });
      if(old) {
        var index = $scope.awesomeThings.indexOf(old);
        $scope.awesomeThings.splice(index, 1, thing);
      } else {
        $scope.awesomeThings.push(thing);
      }
    });

    socket.on('thing:remove', function(thing) {
      var old = _.find($scope.awesomeThings, { _id: thing._id });
      var index = $scope.awesomeThings.indexOf(old);
      $scope.awesomeThings.splice(index, 1);
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