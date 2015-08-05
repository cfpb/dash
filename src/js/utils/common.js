var $ = require('jquery');
var resources = require('./resources');

var common = {};


common.getAllTeams = function(){
  return $.get(resources.routes.ALL_TEAMS);
};

common.getAllUsers = function(){
  return $.get(resources.routes.ALL_USERS);
};

common.teamCreate = function(action){
  return $.ajax({
    url: resources.routes.team(action),
    dataType: 'json',
    type: 'PUT'
  });
}

common.teamAddMember = function(action){
  return $.ajax({
    url: resources.routes.teamMember(action),
    dataType: 'json',
    type: 'PUT'
  });
};

common.teamRemoveMember = function(action){
  return $.ajax({
    url: resources.routes.teamMember(action),
    dataType: 'json',
    type: 'DELETE'
  });
};

common.teamAddAsset = function(action){
  return $.ajax({
    url: resources.routes.teamAddAsset(action),
    dataType: 'json',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(action.assetData)
  });
};

common.teamRemoveAsset = function(action){
  return $.ajax({
    url: resources.routes.teamRemoveAsset(action),
    dataType: 'json',
    type: 'DELETE'
  });
};

common.getCurrentUserInfo = function(){
  return $.get(resources.routes.CURRENT_USER_INFO)
};

common.deactivateUser = function(userId){
  return $.ajax({
    url: resources.routes.userActions(userId),
    dataType: 'json',
    type: 'DELETE'
  });
};

common.reactivateUser = function(userId){
  return $.ajax({
    url: resources.routes.userActions(userId),
    dataType: 'json',
    type: 'PUT'
  });
};


common.userData = function(action){
  return $.ajax({
    url: resources.routes.userData(action),
    method: 'PUT',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(action.data)
  })
}

module.exports = common;
