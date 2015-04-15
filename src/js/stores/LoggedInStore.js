var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var utils = require('../utils/storeUtils');
var resources = require('../utils/resources');



//$(document).ajaxError(function( event, xhr ) {
//  if (xhr.status == 401) {
//    LoggedInStore.set('loggedIn', false);
//  }
//});

var LoggedInStore = Backbone.Model.extend({
  url: resources.routes.CURRENT_USER_INFO,

  initialize: function( attrs, opts ) {
    AppDispatcher.register(this.handleAction);
    this.fetch();
  },
  actions: {}
});

_.extend(LoggedInStore, utils);


module.exports = LoggedInStore;
