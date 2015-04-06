var _ = require('lodash');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var AppDispatcher = require('../dispatcher/AppDispatcher');

window.$ = $;

$(document).ajaxError(function (event, xhr) {
  if (xhr.status == 401) {
    loggedInStore.set('loggedIn', false);
  }
});

var LoggedInStore = Backbone.Model.extend({
  url: function() {return '/kratos/user';},
  initialize: function(attrs, opts) {
    AppDispatcher.register(_.bind(this.handleAction));
    this.fetch();
  },
  actions: {

  },
  handleAction: function(action) {
    var actionHandler = this.actions[action.actionType];
    if (actionHandler) {
      return actionHandler.call(this, action);
    }
  },
  isLoggedIn: function() {
    return this.get('loggedIn') || true;
  },

})

var loggedInStore = new LoggedInStore();

module.exports = loggedInStore;
