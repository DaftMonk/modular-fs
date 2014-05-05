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

    return socket;
  });