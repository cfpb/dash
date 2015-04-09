var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeamConstants = require('../constants/TeamConstants');
var common = require('../utils/common');
var _ = require('lodash');

var TeamActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: TeamConstants.TEAM_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TeamConstants.TEAM_DESTROY,
      id: id
    });
  },

  addMember: function(opts) {
    action = _.pick((opts || {}), 'teamName', 'roleName', 'userId')
    action.actionType = TeamConstants.TEAM_ADD_MEMBER;
    AppDispatcher.dispatch(action);
  },

  removeMember: function(opts) {
    action = _.pick((opts || {}), 'teamName', 'roleName', 'userId')
    action.actionType = TeamConstants.TEAM_REMOVE_MEMBER;
    AppDispatcher.dispatch(action);
  }

};

module.exports = TeamActions;
