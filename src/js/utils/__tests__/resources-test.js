jest.dontMock('../resources');

describe('resources functions tests', function() {
  it('should create a correct team request url from opt', function() {
    var resources = require('../resources');
    var opts = {
      orgName: 'org',
      teamName: 'teamName',
      roleType: 'role',
      userId: 'userId'
    };
    var expectedUrl = '/kratos/orgs/org/teams/teamName/roles/role/userId',
      actualUrl = resources.routes.TEAM_USER_ACTION(opts);
    expect(actualUrl).toBe(expectedUrl);
  });
});
