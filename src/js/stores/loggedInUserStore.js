var LoggedInUserStore = require('./Classes/LoggedInStore');
var loggedInUserStore = new LoggedInUserStore();
var $ = require('jquery');

if (typeof window !== 'undefined') {
  window.loggedInUserStore = loggedInUserStore;
}


module.exports = loggedInUserStore;
