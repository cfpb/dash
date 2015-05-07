var common = require('../../utils/common');
var resources = require('../../utils/resources');
var userStore = require('../userStore');
var Store = require('./Store');

var TeamDetail = Store.backbone.Model.extend({
  name: 'TeamDetail',
  url: function() {
    return resources.routes.teamDetail(this);
  },
  idAttribute: 'name'
});

var TeamDetailStore = Store.Collection.extend({
  model: TeamDetail,
  actions: {
    REFRESH_TEAM_DETAILS: function( action ) {
      var that = this;
      var team = this.get(action.teamName);
      if (!team) {
        team = new TeamDetail({name: action.teamName});
        this.add(team);
      }
      if (action.force || !team.lastRequest || (+new Date() - team.lastRequest) > 5 * 60) {
        team.fetch();
        team.lastRequest = +new Date();
      }
    }
  }

});

module.exports = TeamDetailStore;
