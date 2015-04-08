var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var Team = Backbone.Model.extend({
  idAttribute: '_id'
});

var TeamStore = Backbone.Collection.extend({
  model: Team,
  url: '/kratos/orgs/devdesign/teams',
  initialize: function(attrs, opts) {
    AppDispatcher.register(_.bind(this.handleAction, this));
    this.fetch();
  },
  actions: {

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
