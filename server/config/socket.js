'use strict';

var socketio = null;

function onInfo(socket, data) {
  console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
}

function onDisconnect(socket) {
  //...
}

function onConnect(socket) {
  socket.on('info', function (data) {
    onInfo(socket, data);
  });

  require('../api/thing/thing.socket').register(socket);
  // Add more sockets above here
}

exports.register = function (socketio) {
  socketio.set('log level', 2);

  socketio.sockets.on('connection', function (socket) {
    // Attach variables.
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
