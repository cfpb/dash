var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeamConstants = require('../constants/TeamConstants');
var common = require('../utils/common');
var _ = require('lodash');

var TeamActions = {

  /**
   * @param  {string} text
   */
  create: function(opts) {
    action = _.pick((opts || {}), 'teamName');
    action.actionType = TeamConstants.TEAM_CREATE;
    AppDispatcher.dispatch(action);
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
    action = _.pick((opts || {}), 'teamName', 'roleName', 'userId');
    action.actionType = TeamConstants.TEAM_ADD_MEMBER;
    AppDispatcher.dispatch(action);
  },

  removeMember: function(opts) {
    action = _.pick((opts || {}), 'teamName', 'roleName', 'userId');
    action.actionType = TeamConstants.TEAM_REMOVE_MEMBER;
    AppDispatcher.dispatch(action);
  },

  addAsset: function(opts) {
    action = _.pick((opts || {}), 'teamName', 'resourceName', 'assetData');
    action.actionType = TeamConstants.TEAM_ADD_ASSET;
    AppDispatcher.dispatch(action);
  },

  removeAsset: function(opts) {
    action = _.pick((opts || {}), 'teamName', 'resourceName', 'assetId');
    action.actionType = TeamConstants.TEAM_REMOVE_ASSET;
    AppDispatcher.dispatch(action);
  }
};

module.exports = TeamActions;
