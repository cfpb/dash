jest.dontMock('../resources');

describe('resources functions tests', function() {
  it('should create a correct team request url from opt', function() {
    var resources = require('../resources');
    var opts = {
     // orgName: 'org',
      teamName: 'teamName',
      roleName: 'role',
      userId: 'userId'
    };
    var expectedUrl = '/kratos/orgs/devdesign/teams/teamName/roles/role/userId',
      actualUrl = resources.routes.teamMember(opts);
    expect(actualUrl).toBe(expectedUrl);
  });
});
