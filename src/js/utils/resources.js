var resources = {
  baseUrl: '/kratos',
  orgName: 'devdesign',
  routes: {
    team: function( action ) {
      return resources.baseUrl + '/orgs/' + resources.orgName + '/teams/' + action.id
    },
    teamMember: function( action ) {
      return resources.routes.team(action) + '/roles/' + action.roleName + '/' + action.userId;
    },
    teamAddAsset: function( action ) {
      return resources.routes.team(action) + '/resources/' + action.resourceName;
    },
    teamRemoveAsset: function( action ) {
      return resources.routes.teamAddAsset(action) + '/' + action.assetId;
    },
    userData: function( action ) {
      return resources.baseUrl + '/users/' + action.id + '/data/' + (action.path || '');
    },
    ALL_TEAMS: '/kratos/orgs/devdesign/teams',
    ALL_USERS: '/kratos/users',
    CURRENT_USER_INFO: '/kratos/user'
  },
  teamResources: {
    gh: {
      assetTitle: 'GitHub Repos'
    },
    moirai: {
      assetTitle: 'Virtual Machines'
    }
  }

};
window.resources = resources;
module.exports = resources;
