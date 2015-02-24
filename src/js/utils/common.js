var $ = require('jquery');

var common = {};

common.getAllTeams = function() {
  return $.get('/dummy-data/teams.json');
};

common.getAllUsers = function() {
  return $.get('/dummy-data/users.json');
};

module.exports = common;