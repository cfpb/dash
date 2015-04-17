var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var utils = require('../utils/storeUtils');
var resources = require('../utils/resources');


var LoggedInStore = Backbone.Model.extend({
  url: resources.routes.CURRENT_USER_INFO,

  initialize: function( attrs, opts ) {
    AppDispatcher.register(this.handleAction);
    this.fetch();
  },
  actions: {},
  isLoggedIn: function() {
    return (this.get('loggedIn') === undefined) ? true : this.get('loggedIn');
  }

});



_.extend(LoggedInStore.prototype, utils);

module.exports = LoggedInStore;
