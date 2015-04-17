var TeamStore = require('./TeamStore');
var UserStore = require('./UserStore');
var LoggedInStore = require('./LoggedInStore');

var stores = {
  teamStore: new TeamStore(),
  userStore: new UserStore(),
  loggedInStore: new LoggedInStore()
};

if (typeof(window) !== "undefined") {
  window.stores = stores;
}

module.exports = stores;
