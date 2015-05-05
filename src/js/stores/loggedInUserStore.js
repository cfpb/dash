var LoggedInUserStore = require('./Classes/LoggedInStore');
var loggedInUserStore = new LoggedInUserStore();
var $ = require('jquery');

if (typeof window !== 'undefined') {
  window.loggedInUserStore = loggedInUserStore;
}

$(document).ajaxError(function(event, xhr) {
  if (xhr.status == 401) {
    loggedInUserStore.set('loggedIn', false);
  }
});

module.exports = loggedInUserStore;
