var resources = {
  baseUrl: '/kratos',
  routes: {
    TEAM_USER_ACTION: function(opts) {
      return this.baseUrl + 'orgs' + opts.orgName + '/teams/' + opts.teamName + '/roles/' + opts.role + '/' + opts.id;
    },
    ALL_TEAMS: '/kratos/orgs/devdesign/teams',
    ALL_USERS: '/kratos/users'
  }
};
module.export = resources;
