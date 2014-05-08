/* global io */
'use strict';

angular.module('ngApp')
  .factory('socket', function(socketFactory) {
    var retryInterval = 5000;
    var retryTimer;

    clearInterval(retryTimer);

    var ioSocket = io.connect('', {
      'force new connection': true,
      'max reconnection attempts': Infinity,
      'reconnection limit': 10 * 1000
    });

    retryTimer = setInterval(function () {
      if (!ioSocket.socket.connected &&
          !ioSocket.socket.connecting &&
          !ioSocket.socket.reconnecting) {
        ioSocket.connect();
      }
    }, retryInterval);

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socket: socket,

      syncCollection: function(collection, itemName) {
        socket.on(itemName + ':save', function(newItem) {
          var oldItem = _.find(collection, { _id: newItem._id });

          // Update item if it already exists in collection
          if(oldItem) {
            var index = collection.indexOf(oldItem);
            collection.splice(index, 1, newItem);
          }

          // Or just add new item to collection
          else {
            collection.push(newItem);
          }
        });

        socket.on(itemName + ':remove', function(newItem) {
          var oldItem = _.find(collection, { _id: newItem._id });
          var index = collection.indexOf(oldItem);
          collection.splice(index, 1);
        });
      }
    };
  });