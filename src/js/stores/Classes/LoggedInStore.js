var Store = require('./Store');
var resources = require('../../utils/resources');


var LoggedInStore = Store.Model.extend({
  url: resources.routes.CURRENT_USER_INFO,
  idAttribute: 'name',
  isLoggedIn: function() {
    return (this.get('loggedIn') === undefined) ? true : this.get('loggedIn');
  }
});

module.exports = LoggedInStore;
