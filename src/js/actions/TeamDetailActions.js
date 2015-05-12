var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeamDetailConstants = require('../constants/TeamDetailConstants');
var _ = require('lodash');


function dispatch( action, actionType ) {
  action.actionType = actionType;
  AppDispatcher.dispatch(action);
}

var TeamDetailActions = {
  refreshDetails: function( opts ) {
    var action = _.pick((opts || {}), 'teamName', 'force');
    dispatch(action, TeamDetailConstants.REFRESH_TEAM_DETAILS);
  }
}

module.exports = TeamDetailActions;
