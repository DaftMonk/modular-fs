/**
 * Populate DB with sample data
 * to disable, edit config/env/index.js, and set `sampleData: false`
 */

'use strict';

var Thing = require('../../api/thing/thing.model');
var User = require('../../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'HTML5 Boilerplate',
    info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'
  }, {
    name : 'AngularJS',
    info : 'AngularJS is a toolset for building the framework most suited to your application development.'
  }, {
    name : 'Karma',
    info : 'Spectacular Test Runner for JavaScript.'
  }, {
    name : 'Express',
    info : 'Flexible and minimalist web application framework for node.js.'
  }, {
    name : 'MongoDB + Mongoose',
    info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});