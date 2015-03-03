var $ = require('jquery');
var resources = require('./resources');

var common = {};

common.getAllTeams = function() {
  return $.get(resources.routes.ALL_TEAMS);
};

common.getAllUsers = function() {
  return $.get(resources.routes.ALL_USERS);
};

common.addUser = function(opts) {
  return $.ajax({
    url: resources.routes.TEAM_USER_ACTION(opts),
    type: 'PUT'
  });
};

common.removeUser = function(opts) {
  return $.ajax({
    url: resources.routes.TEAM_USER_ACTION(opts),
    type: 'DELETE'
  });
};

module.exports = common;
