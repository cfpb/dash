var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeamConstants = require('../constants/TeamConstants');
var common =require('../utils/common');
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


    addUser: function( opts ) {
        opts = opts || {};
        AppDispatcher.dispatch({
            actionType: TeamConstants.TEAM_ADD_USER_START,
            orgName: opts.orgName,
            teamName: opts.teamName,
            roleType: opts.roleType,
            userId: opts.userId
        });

        var userPromise=common.addUser(opts);
        userPromise.done( function(data){
            AppDispatcher.dispatch({
               actionType: TeamConstants.TEAM_ADD_USER_COMPLETE,
                teamName:'',
                userId:''
            });
        });
    }

};

module.exports = TeamActions;
