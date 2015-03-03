var resources = {
  baseUrl: '/kratos',
  routes: {
    TEAM_USER_ACTION: function(opts) {
      return resources.baseUrl + '/orgs/' + opts.orgName + '/teams/' + opts.teamName + '/roles/' + opts.roleType + '/' + opts.userId;
    },
    ALL_TEAMS: '/kratos/orgs/devdesign/teams',
    ALL_USERS: '/kratos/users'
  }
};
module.exports = resources;
