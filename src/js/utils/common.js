var $ = require('jquery');

var common = {};

common.getAllTeams = function() {
  return $.get('/kratos/orgs/devdesign/teams');
};

common.getAllUsers = function() {
  return $.get('/kratos/users');
};

module.exports = common;
