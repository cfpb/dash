var Store = require('./Store');
var resources = require('../../utils/resources');

var User = Store.backbone.Model.extend({
  name: 'User',
  idAttribute: 'name'
});

var UserStore = Store.Collection.extend({
  model: User,
  url: resources.routes.ALL_USERS
});

module.exports = UserStore;
