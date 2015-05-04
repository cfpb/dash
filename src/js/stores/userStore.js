var UserStore = require('./Classes/UserStore');
var userStore = new UserStore();

if (typeof window !== 'undefined') {
  window.userStore = userStore;
}

module.exports = userStore;
