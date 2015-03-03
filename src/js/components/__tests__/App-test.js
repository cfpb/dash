jest.dontMock('../../utils/common');
//.dontMock('../../utils/resources');

describe('Get all teams method', function() {
  it('should call the teams URL', function() {
    var common = require('../../utils/common'),
      resources = require('../../utils/resources'),
      $ = require('jquery');
    common.getAllTeams();

    expect($.get).toBeCalledWith(resources.routes.ALL_TEAMS);

  });
});

describe('Get all users method', function() {
  it('should call the users URL', function() {
    var common = require('../../utils/common'),
      resources = require('../../utils/resources'),
      $ = require('jquery');
    common.getAllUsers();
    expect($.get).toBeCalledWith(resources.routes.ALL_USERS);
  });
});
