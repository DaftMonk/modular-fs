/**
 * Socket.io configuration
 */

'use strict';

// Setup socket.io
module.exports = function (socketio) {
  // The amount of detail that the server should output to the logger.
  // 0 - error
  // 1 - warn
  // 2 - info
  // 3 - debug
  socketio.set('log level', 2);

  socketio.sockets.on('connection', function (socket) {
    socket.address = socket.handshake.address.address + ':' +
                     socket.handshake.address.port;
    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
   // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Register listeners for components
  require('./api/thing/thing.socket').register(socket);
}