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

