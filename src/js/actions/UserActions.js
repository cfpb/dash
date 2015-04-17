var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeamConstants = require('../constants/UserConstants');
var common = require('../utils/common');

var UserActions = {

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

  addUser: function(opts) {
   
  }

};

module.exports = UserActions;
