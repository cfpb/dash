var resources = require('../../utils/resources');
var Store = require('./Store');

var TeamDetail = Store.backbone.Model.extend({
  name: 'TeamDetail',
  url: function(){
    return resources.routes.teamDetail(this);
  },
  fetchInProgress: false,
  idAttribute: 'name',

  fetch: function(opts){

    var that = this;
    this.fetchInProgress = true;
    var oldSuccess, oldError

    if (opts) {
      oldSuccess = opts.success
      oldError = opts.error
    }
    else {
      opts = {};
    }

    opts.error = function(){
      that.fetchInProgress = false;
      if (oldError) {
        oldError.apply(this, arguments)
      }
    };

    opts.success = function(){
      that.fetchInProgress = false;
      if (oldSuccess) {
        oldSuccess.apply(this, arguments)
      }
    };


    return Store.Model.prototype.fetch.apply(this, [opts]);
  }
});

var TeamDetailStore = Store.Collection.extend({
  model: TeamDetail,
  actions: {
    REFRESH_TEAM_DETAILS: function(action){

      var team = this.get(action.teamName);
      if (!team) {
        team = new TeamDetail({name: action.teamName});
        this.add(team);

      }
      if (action.force || !team.lastRequest || (+new Date() - team.lastRequest) > resources.defaultTimeouts.refreshStore ) {
        team.fetch();
        team.lastRequest = +new Date();
      }
    }
  }
});

module.exports = TeamDetailStore;
