var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var storeUtils = {
  initialize: function( attrs, opts ) {
    AppDispatcher.register(_.bind(this.handleAction, this));
    this.fetch();
  },
  actions : {},
  onChange: function( handler, ctx ) {
    this.on('all', handler, ctx);
  },
  getState: function() {
    return this;
  }
}

modelStoreUtils = _.extend(storeUtils, {
  handleAction: function( action ) {
    actions = this.actions;
    var actionHandler = actions[action.actionType];
    if (actionHandler) {
      return actionHandler.call(this, action);
    }
  },
});

collectionStoreUtils = _.extend(storeUtils, {
  handleAction: function(action) {
    if (action.id) {
      var team = this.get(action.id);
      if (!team) {
        throw new Error(this.model.name + ' "' + action.id + '" does not exist.');
      }
      actions = team.actions;
    } else {
      actions = this.actions;
    }
    var actionHandler = actions[action.actionType];
    if (actionHandler) {
      return actionHandler.call(this, action);
    }
  }
});

module.exports = {
  Model: Backbone.Model.extend(modelStoreUtils),
  Collection: Backbone.Collection.extend(collectionStoreUtils),
  Backbone: Backbone,
}
