/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var thing = require('./thing.model');

function onSave(socket, doc, cb) {
  socket.emit('thing:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('thing:remove', doc);
}

function register(socket) {
  thing.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  thing.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

// Public API
exports.register = register;
