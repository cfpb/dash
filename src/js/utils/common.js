var $ = require('jquery');
var resources = ('resources');

var common = {};

common.getAllTeams = function() {
  return $.get(resources.ALL_TEAMS);
};

common.getAllUsers = function() {
  return $.get(resources.ALL_USERS);
};

common.addUser = function(opts) {
  return $.ajax({
    url: resources.TEAM_USER_ACTION(opts),
    type: 'PUT'
  });
};

common.removeUser = function(opts) {
  return $.ajax({
    url: resources.TEAM_USER_ACTION(opts),
    type: 'DELETE'
  });
};

module.exports = common;
