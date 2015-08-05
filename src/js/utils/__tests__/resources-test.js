jest.dontMock('../resources');

describe('resources functions tests', function() {
  var opts = {
    resourceName: 'resourceName',
    assetId: 'assetId',
    id: 'teamName',
    roleName: 'role',
    userId: 'userId',
    path: 'somePath'
  };
  var resources;
  beforeEach(function() {
    resources = require('../resources');
  });
  it('should create a correct team request url from opt', function() {
    var expectedUrl = '/kratos/orgs/devdesign/teams/teamName/roles/role/userId',
      actualUrl = resources.routes.teamMember(opts);
    expect(actualUrl).toBe(expectedUrl);
  });

  it('should create a correct teamDetail request url from opt', function() {
    var expectedUrl = '/kratos/orgs/devdesign/teams/teamName/details',
      actualUrl = resources.routes.teamDetail(opts);
    expect(actualUrl).toBe(expectedUrl);
  });

  it('should create a correct teamAddAsset request url from opt', function() {
    var expectedUrl = '/kratos/orgs/devdesign/teams/teamName/resources/resourceName',
      actualUrl = resources.routes.teamAddAsset(opts);
    expect(actualUrl).toBe(expectedUrl);
  });

  it('should create a correct teamRemoveAsset request url from opt', function() {
    var expectedUrl = '/kratos/orgs/devdesign/teams/teamName/resources/resourceName/assetId',
      actualUrl = resources.routes.teamRemoveAsset(opts);
    expect(actualUrl).toBe(expectedUrl);
  });

  it('should create a correct userData request url from opt', function() {
    var expectedUrl = '/kratos/users/teamName/data/somePath',
      actualUrl = resources.routes.userData(opts);
    expect(actualUrl).toBe(expectedUrl);
  });

  it('should create a correct user action  request url from opt', function() {
    var expectedUrl = '/kratos/users/userId',
      actualUrl = resources.routes.userActions(opts.userId);
    expect(actualUrl).toBe(expectedUrl);
  })
});
