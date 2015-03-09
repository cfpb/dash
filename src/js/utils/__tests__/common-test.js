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

describe('User functions/actions', function() {
  it('should call the correct routes when user actions are invoked', function() {
    var common = require('../../utils/common'),
      resources = require('../../utils/resources'),
      $ = require('jquery');
    var opts = {'foo': 'boo'};

    common.getAllUsers();
    expect($.get).toBeCalledWith(resources.routes.ALL_USERS);

    common.addUser(opts);
    expect($.ajax).toBeCalled();

    common.removeUser(opts);
    expect($.ajax).toBeCalled();

    common.getCurrentUserInfo();
    expect($.get).toBeCalledWith(resources.routes.CURRENT_USER_INFO);

  });
});
