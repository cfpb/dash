var _ = require('lodash');
var backbone = require('backbone');
backbone.$ = require('jquery');
var AppDispatcher = require('../../dispatcher/AppDispatcher');

var storeUtils = {
  initialize: function( attrs, opts ) {
    AppDispatcher.register(_.bind(this.handleAction, this));
    if (this.url) {
      this.fetch();
    }
  },
  actions: {},
  onChange: function( handler, ctx ) {
    this.on('all', handler, ctx);
  },
  getState: function() {
    return this;
  }
};

var modelStoreUtils = _.extend({}, storeUtils, {
  handleAction: function( action ) {
    var actions = this.actions;
    var actionHandler = actions[action.actionType];
    if (actionHandler) {
      return actionHandler.call(this, action);
    }
  }
});

var collectionStoreUtils = _.extend({}, storeUtils, {
  handleAction: function( action ) {
    var actions, model;

    if (action.id) {
      model = this.get(action.id);
      actions = (model) ? model.actions : {};
      actions = actions || {};
    } else {
      actions = this.actions;
    }
    var actionHandler = actions[action.actionType];
    if (actionHandler) {
      return actionHandler.call(model || this, action);
    }
  }
});

module.exports = {
  Model: backbone.Model.extend(modelStoreUtils),
  Collection: backbone.Collection.extend(collectionStoreUtils),
  backbone: backbone
}
