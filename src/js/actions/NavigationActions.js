var AppDispatcher = require('../dispatcher/AppDispatcher');
var NavigationConstants = require('../constants/NavigationConstants');

var NavigationActions = {

  /**
   * @param  {string} text
   */
  navigate: function(path, opts) {
    AppDispatcher.dispatch({
      actionType: NavigationConstants.NAVIGATE,
      path: path,
      opts: opts
    });
  },

};

module.exports = NavigationActions;
