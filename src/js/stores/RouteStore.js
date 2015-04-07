var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/NavigationConstants');

var RouteStore = Backbone.Router.extend({
  initialize: function() {
    AppDispatcher.register(_.bind(this.handleAction, this));
    Backbone.history.start({pushState: true, root: '/static'})
  },
  routes: {
    '*path': 'handleRoute',
  },
  handleRoute: function(path) {
    path = path || '';
    this.route = _.compact(path.split('/'));
    this.trigger('change');
  },
  handleAction: function(action) {
    if (action.actionType == constants.NAVIGATE) {
      var opts = {trigger: true};
      _.extend(opts, (action.opts || {}));
      this.navigate(action.path, opts);
    }
  },
  onChange: function(handler, ctx) {
    this.on('change', handler, ctx);
  },
  getState: function() {
    return this.route;
  }
})

var routeStore = new RouteStore();
module.exports = routeStore;