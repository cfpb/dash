var TeamDetailStore = require('./Classes/TeamDetailStore');
var teamDetailStore = new TeamDetailStore();

if (typeof window !== 'undefined') {
  window.teamDetailStore = teamDetailStore;
}

module.exports = teamDetailStore;
