var $ = require('jquery');
var resources = require('./resources');

var common = {};

if ($(document)) {
  $(document).ajaxError(function( event, xhr ) {
    console.log('AJAX ERROR! Here\'s the response:', xhr)
  });
}

common.getAllTeams = function() {
  return $.get(resources.routes.ALL_TEAMS);
};

common.getAllUsers = function() {
  return $.get(resources.routes.ALL_USERS);
};

common.teamCreate = function( action ) {
  return $.ajax({
    url: resources.routes.team(action),
    dataType: 'json',
    type: 'PUT'
  });
}

common.teamAddMember = function( action ) {
  return $.ajax({
    url: resources.routes.teamMember(action),
    dataType: 'json',
    type: 'PUT'
  });
};

common.teamRemoveMember = function( action ) {
  return $.ajax({
    url: resources.routes.teamMember(action),
    dataType: 'json',
    type: 'DELETE'
  });
};

common.teamAddAsset = function( action ) {
  return $.ajax({
    url: resources.routes.teamAddAsset(action),
    dataType: 'json',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(action.assetData)
  });
};

common.teamRemoveAsset = function( action ) {
  return $.ajax({
    url: resources.routes.teamRemoveAsset(action),
    dataType: 'json',
    type: 'DELETE'
  });
};

common.getCurrentUserInfo = function() {
  return $.get(resources.routes.CURRENT_USER_INFO)
};

common.userData = function( action ) {
  return $.ajax({
    url: resources.userData(action),
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(action.data)
  })
}

module.exports = common;
