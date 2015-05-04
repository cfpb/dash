var TeamStore = require('./Classes/TeamStore');
var teamStore = new TeamStore();

if (typeof window !== 'undefined') {
  window.teamStore = teamStore;
}

module.exports = teamStore;
