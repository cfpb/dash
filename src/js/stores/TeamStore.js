var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var common = require('../utils/common');

var Team = Backbone.Model.extend({
  idAttribute: 'name',
  getMembersByRole: function(role) {
    var UserStore = require('./UserStore')
    var roleData = this.get('roles')[role] || {};
    var memberNames = roleData.members || [];
    var members = UserStore.filter(function(user) {
      return memberNames.indexOf(user.get('name')) >= 0;
    });
    return members;
  },
  getNonMembersByRole: function(role) {
    var UserStore = require('./UserStore')
    var roleData = this.get('roles')[role] || {};
    var memberNames = roleData.members || [];
    var members = UserStore.filter(function(user) {
      return memberNames.indexOf(user.get('name')) < 0;
    });
    return members;
  },
  getMembersSortedByRole: function() {
    var UserStore = require('./UserStore')
    var members = {};
    for (var role in this.get('roles')) {
      members[role] = this.getMembersByRole(role);
    }
    return members;
  },
  addMember: function(action) {
    var that = this;
    common.teamAddMember(action).done(function(newTeamData) {
      that.set(newTeamData);
    });
  },
  removeMember: function(action) {
    var that = this;
    common.teamRemoveMember(action).done(function(newTeamData) {
      that.set(newTeamData);
    });
  },
  addAsset: function(action) {
    var that = this;
    common.teamAddAsset(action).done(function(newTeamData) {
      that.set(newTeamData);
    });
  },
  removeAsset: function(action) {
    var that = this;
    common.teamRemoveAsset(action).done(function(newTeamData) {
      that.set(newTeamData);
    });
  }
});

var TeamStore = Backbone.Collection.extend({
  model: Team,
  url: '/kratos/orgs/devdesign/teams',
  initialize: function(attrs, opts) {
    AppDispatcher.register(_.bind(this.handleAction, this));
    this.fetch();
  },
  actions: {
    TEAM_ADD_MEMBER: function(action) {
      var team = this.get(action.teamName);
      if (!team) {
        throw new Error('team "' + action.teamName + '" does not exist.');
      }
      team.addMember(action);
    },
    TEAM_REMOVE_MEMBER: function(action) {
      var team = this.get(action.teamName);
      if (!team) {
        throw new Error('team "' + action.teamName + '" does not exist.');
      }
      team.removeMember(action);
    },
    TEAM_ADD_ASSET: function(action) {
      var team = this.get(action.teamName);
      if (!team) {
        throw new Error('team "' + action.teamName + '" does not exist.');
      }
      team.addAsset(action);
    },
    TEAM_REMOVE_ASSET: function(action) {
      var team = this.get(action.teamName);
      if (!team) {
        throw new Error('team "' + action.teamName + '" does not exist.');
      }
      team.removeAsset(action);
    }
  },
  handleAction: function(action) {
    var actionHandler = this.actions[action.actionType];
    if (actionHandler) {
      return actionHandler.call(this, action);
    }
  },
  onChange: function(handler, ctx) {
    this.on('all', handler, ctx);
  },
  getState: function() {
    return this;
  },
})

teamStore = new TeamStore();
window.teamStore = teamStore;
module.exports = teamStore;


// var EventEmitter = require('events').EventEmitter;
// var TeamConstants = require('../constants/TeamConstants');
// var assign = require('object-assign');
// var common = require('../utils/common');
// var $ = require('jquery');

// var CHANGE_EVENT = 'change';

// var _teams = {};

// /**
//  * Create a Team item.
//  * @param  {string} text The content of the TODO
//  */
// function create(text) {

// }

// function destroy(id) {
//   // delete _teams[id];
// }

// function addUser(userId) {
//   var userPromise = common.addUser(userId);
//   userPromise.done();
// }

// function removeUser(opts) {
//   var userPromise = common.removeUser(opts);
//   userPromise.done();
// }


// var TeamStore = assign({}, EventEmitter.prototype, {

//   getAll: function() {
//     return common.getAllTeams();
//   },
//   getFilteredTeams: function(teams, currentUser) {
//     var myTeams = [],
//       otherTeams = [],
//       assets;

//     teams.forEach(function(team) {
//       if ($.inArray(currentUser.name, team.roles.member.members) > -1) {
//         myTeams.push(team);
//       } else {
//         otherTeams.push(team);
//       }
//     });

//     return {
//       myTeams: myTeams,
//       otherTeams: otherTeams
//     }
//   },
//   addTeamNames: function(team, members) {
//     return members.map(function(member) {
//       member.teams = member.teams ? member.teams : [];
//       member.teams.push(team)
//       return member;
//     });
//   },
//   constructTeamAndUserMetadata: function(team, users, currentUserId) {
//     var teamMetadata = {};
//     teamMetadata.roles = {};

//     teamMetadata.userMembers = users.filter(function(user, i) {
//       return $.inArray(user.name, team.roles.member.members) > -1;
//     });
//     teamMetadata.adminMembers = users.filter(function(user, i) {
//       return $.inArray(user.name, team.roles.admin.members) > -1;
//     });

//     teamMetadata.userMembers = this.addTeamNames(team, teamMetadata.userMembers);
//     teamMetadata.adminMembers = this.addTeamNames(team, teamMetadata.adminMembers);

//     if (currentUserId && $.inArray(currentUserId, team.roles.member.members) > -1) {
//       teamMetadata.roles.member = true;
//     }

//     if (currentUserId && $.inArray(currentUserId, team.roles.admin.members) > -1) {
//       teamMetadata.roles.admin = true;
//     }
//     teamMetadata.name = team.name;
//     return teamMetadata;

//   },
//   getTeamAssets: function(team) {
//     return team.rsrcs.gh ? team.rsrcs.gh.assets : [];
//   },
//   emitChange: function() {
//     this.emit(CHANGE_EVENT);
//   }
// });

// // Register callback to handle all updates
// AppDispatcher.register(function(action) {
//   switch (action.actionType) {
//     case TeamConstants.TEAM_ADD_USER_START:
//       addUser();
//       TeamStore.emitChange();
//       break;

//     case TeamConstants.TEAM_REMOVE_USER_START:
//       removeUser(action.payload);
//       TeamStore.emitChange();
//       break;

//     default:
//     // no op
//   }
// });

// module.exports = TeamStore;
