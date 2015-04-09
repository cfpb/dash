var $ = require('jquery');
var resources = require('./resources');

var common = {};

$(document).ajaxError(function (event, xhr) {
  console.log('AJAX ERROR!', xhr)
});

common.getAllTeams = function() {
  return $.get(resources.routes.ALL_TEAMS);
};

common.getAllUsers = function() {
  return $.get(resources.routes.ALL_USERS);
};

common.teamAddMember = function(action) {
  return $.ajax({
    url: resources.routes.teamMember(action),
    dataType: 'json',
    type: 'PUT'
  });
};

common.teamRemoveMember = function(action) {
  return $.ajax({
    url: resources.routes.teamMember(action),
    dataType: 'json',
    type: 'DELETE'
  });
};
common.getCurrentUserInfo = function(){
  return $.get(resources.routes.CURRENT_USER_INFO)
};

module.exports = common;
