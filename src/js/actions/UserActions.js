var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var common = require('../utils/common');
var _ = require('lodash');


function dispatch(action, actionType) {
  action.actionType = actionType;
  AppDispatcher.dispatch(action);
}

var UserActions = {
  userData: function(opts) {
    var action = _.pick((opts || {}), 'path', 'data', 'id');
    dispatch(action, UserConstants.USER_DATA);
  }
};

module.exports = UserActions;
