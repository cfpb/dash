var common = require('../../utils/common');
var resources = require('../../utils/resources');
var userStore = require('../userStore');
var Store = require('./Store');
var _ = require('lodash');

var Team = Store.backbone.Model.extend({
  name: 'Team',
  idAttribute: 'name',
  initialize: function() {
    this.isAddingAsset = {}
  },
  isMember: function( userId ) {
    var roles = this.get('roles');

    return _.any(roles, function(roleData ) {
      return (roleData.members || []).indexOf(userId) > -1
    })
  },
  getMembersByRole: function( role ) {
    var roleData = this.get('roles')[role] || {};
    var memberNames = roleData.members || [];
    var members = userStore.filter(function( user ) {
      return memberNames.indexOf(user.get('name')) >= 0;
    });
    return members;
  },
  getNonMembersByRole: function( role ) {
    var roleData = this.get('roles')[role] || {};
    var memberNames = roleData.members || [];
    var members = userStore.filter(function( user ) {
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
  actions: {
    TEAM_ADD_MEMBER: function( action ) {
      var that = this;
      common.teamAddMember(action).done(function( newTeamData ) {
        that.set(newTeamData);
      });
    },
    TEAM_REMOVE_MEMBER: function( action ) {
      var that = this;
      common.teamRemoveMember(action).done(function( newTeamData ) {
        that.set(newTeamData);
      });
    },
    TEAM_ADD_ASSET: function( action ) {
      this.isAddingAsset[action.resourceName] = true;
      this.trigger('change');
      var that = this;
      common.teamAddAsset(action)
        .done(function( newTeamData ) {
          that.set(newTeamData);
        })
        .always(function() {
          that.isAddingAsset[action.resourceName] = false;
          that.trigger('change');
        });
    },
    TEAM_REMOVE_ASSET: function( action ) {
      var that = this;
      common.teamRemoveAsset(action).done(function( newTeamData ) {
        that.set(newTeamData);
      });
    }
  }
});

var TeamStore = Store.Collection.extend({
  model: Team,
  url: resources.routes.ALL_TEAMS,
  myTeams: function() {
    var loggedInUserStore = require('../loggedInUserStore');
    var myId = loggedInUserStore.id;
    return this.userTeams(myId);
  },
  userTeams: function(userId) {
    return this.filter(function( model ) {
      return model.isMember(userId);
    })
  },
  actions: {
    TEAM_CREATE: function( action ) {
      if (!action.teamName) {
        throw new Error('Please provide a team name.');
      }
      var that = this;
      common.teamCreate(action).done(function( newTeamData ) {
        that.add(newTeamData);
      });
    }
  }
});

module.exports = TeamStore;
