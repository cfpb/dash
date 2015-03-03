jest.dontMock('../resources.js');


describe('resources functions tests', function() {
  xit('should create a correct team request url from opt', function() {
    var resources = require('../resources.js');
    var opts = {
      orgName: 'org',
      teamName: 'teamName',
      roleType: 'role',
      userId: 'userId'
    };

    console.log(resources);
    var expectedUrl = '/kratos/orgs/org/teams/team/roles/role/userId',
      actualUrl = resources.TEAM_USER_ACTION(opts);

    expect(actualUrl).toBe(expectedUrl);
  });

});
