var resources = {
  baseUrl: '/kratos',
  orgName: 'devdesign',
  routes: {
    teamMember: function(action) {
      return resources.baseUrl + '/orgs/' + resources.orgName + '/teams/' + action.teamName + '/roles/' + action.roleName + '/' + action.userId;
    },
    ALL_TEAMS: '/kratos/orgs/devdesign/teams',
    ALL_USERS: '/kratos/users',
    CURRENT_USER_INFO: '/kratos/user'
  }
};
module.exports = resources;
