var storeUtils = {
  handleAction: function( action ) {
    var actionHandler = this.actions[action.actionType];
    if (actionHandler) {
      return actionHandler.call(this, action);
    }
  },
  onChange: function( handler, ctx ) {
    this.on('all', handler, ctx);
  },
  getState: function() {
    return this;
  }
}
module.exports = storeUtils;