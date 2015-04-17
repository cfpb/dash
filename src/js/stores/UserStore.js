var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var resources = require('../utils/resources');
var utils = require('../utils/storeUtils');


var User = Backbone.Model.extend({
  idAttribute: 'name'
});

var UserStore = Backbone.Collection.extend({
  model: User,
  url: resources.routes.ALL_USERS,
  initialize: function( attrs, opts ) {

    AppDispatcher.register(this.handleAction);
    this.fetch();
  },
  actions: {}
});

_.extend(UserStore.prototype, utils);
module.exports = UserStore;
