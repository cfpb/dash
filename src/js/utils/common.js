var $ = require('jquery');
var resources = ('resources');

var common = {};

common.getAllTeams = function() {
  return $.get('/kratos/orgs/devdesign/teams');
  //return $.get(resources.routes.ALL_TEAMS);
};

common.getAllUsers = function() {
  return $.get('/kratos/users');
  //return $.get(resources.routes.ALL_USERS);
};

common.addUser = function(opts) {
  return $.get('/kratos/users');
  //return $.ajax({
  //  url: resources.routes.TEAM_USER_ACTION(opts),
  //  type: 'PUT'
  //});
};

common.removeUser = function(opts) {
  return $.ajax({
    url: resources.routes.TEAM_USER_ACTION(opts),
    type: 'DELETE'
  });
};

module.exports = common;
