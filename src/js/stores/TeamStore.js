var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TeamConstants = require('../constants/TeamConstants');
var assign = require('object-assign');
var common = require('../utils/common');
var $ = require('jquery');

var CHANGE_EVENT = 'change';

var _teams = {};

/**
 * Create a Team item.
 * @param  {string} text The content of the TODO
 */
function create(text) {

}

function destroy(id) {
 // delete _teams[id];
}

function addUser(userId) {
  var userPromise = common.addUser(userId);
  userPromise.done();
}

function removeUser(opts) {
  var userPromise = common.removeUser(opts);
  userPromise.done();
}


var TeamStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return common.getAllTeams();
  },
  getFilteredTeams: function(teams, currentUser) {
    var myTeams = [],
      otherTeams = [],
      assets;

    teams.forEach(function(team) {
      if ($.inArray(currentUser.name, team.roles.member.members) > -1) {
        myTeams.push(team);
      } else {
        otherTeams.push(team);
      }
    });

    return {
      myTeams: myTeams,
      otherTeams: otherTeams
    }
  },
  addTeamNames: function(team, members) {
    return members.map(function(member) {
      member.team = {};
      member.team._id = team._id;
      member.team.name = team.name;
      return member;
    });
  },
  constructTeamAndUserMetadata: function(team, users, currentUserId) {
    var teamMetadata = {};
    teamMetadata.roles = {};

    teamMetadata.userMembers = users.filter(function(user, i) {
      return $.inArray(user.name, team.roles.member.members) > -1;
    });
    teamMetadata.adminMembers = users.filter(function(user, i) {
      return $.inArray(user.name, team.roles.admin.members) > -1;
    });

    teamMetadata.userMembers = this.addTeamNames(team, teamMetadata.userMembers);
    teamMetadata.adminMembers = this.addTeamNames(team, teamMetadata.adminMembers);

    if (currentUserId && $.inArray(currentUserId, team.roles.member.members) > -1) {
      teamMetadata.roles.member = true;
    }

    if (currentUserId && $.inArray(currentUserId, team.roles.admin.members) > -1) {
      teamMetadata.roles.admin = true;
    }
    teamMetadata.name = team.name;
    return teamMetadata;

  },
  getTeamAssets: function(team) {
    return team.rsrcs.gh ? team.rsrcs.gh.assets : [];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }
  // These funstions are not used right now
  //addChangeListener: function(callback) {
  //  this.on(CHANGE_EVENT, callback);
  //},
  //
  //removeChangeListener: function(callback) {
  //  this.removeListener(CHANGE_EVENT, callback);
  //}
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch (action.actionType) {
    //TODO: implement properly, killing out coverage right now
    //case TeamConstants.TEAM_CREATE:
    //  create();
    //  TeamStore.emitChange();
    //  break;
    //
    //case TeamConstants.TEAM_DESTROY:
    //  destroy(action.id);
    //  TeamStore.emitChange();
    //  break;

    case TeamConstants.TEAM_ADD_USER_START:
      addUser();
      TeamStore.emitChange();
      break;

    case TeamConstants.TEAM_REMOVE_USER_START:
      removeUser(action.payload);
      TeamStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = TeamStore;
