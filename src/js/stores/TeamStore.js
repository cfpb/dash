var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var common = require('../utils/common');
var resources = require('../utils/resources');
var UserStore = require('./UserStore');
var utils = require('../utils/storeUtils');

var Team = Backbone.Model.extend({
  store: new UserStore(),
  idAttribute: 'name',
  getMembersByRole: function(role) {
    var roleData = this.get('roles')[role] || {};
    var memberNames = roleData.members || [];
    var members = this.store.filter(function(user) {
      return memberNames.indexOf(user.get('name')) >= 0;
    });
    return members;
  },
  getNonMembersByRole: function(role) {
    var roleData = this.get('roles')[role] || {};
    var memberNames = roleData.members || [];
    var members = this.store.filter(function(user) {
      return memberNames.indexOf(user.get('name')) < 0;
    });
    return members;
  },
  getMembersSortedByRole: function() {
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
  url: resources.routes.ALL_TEAMS,
  initialize: function(attrs, opts) {
    AppDispatcher.register(this.handleAction);
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
    },
    TEAM_CREATE: function(action) {
      if (!action.teamName) {
        throw new Error('Please provide a team name.');
      }
      this.createTeam(action)
    }
  },
  createTeam: function(action) {
    var that = this;
    common.teamCreate(action).done(function(newTeamData) {
      that.add(newTeamData);
    });
  }
});

_.extend(TeamStore.prototype, utils);

module.exports = TeamStore;

