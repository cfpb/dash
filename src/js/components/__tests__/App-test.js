jest.dontMock('../../utils/common')
    .dontMock('../../utils/resources');

describe('Get all teams method', function() {
  xit('should call the teams URL', function() {
    var common = require('../../utils/common'),
        resources = require('../../utils/resources'),
        $ = require('jquery');
    //console.log('from app', resources.routes.ALL_TEAMS)
    common.getAllTeams();
    expect($.get).toBeCalledWith('foo');
  });
});

describe('Get all users method', function() {
  xit('should call the users URL', function() {
    var common = require('../../utils/common'),
        resources = require('../../utils/resources'),
        $ = require('jquery');
    common.getAllUsers();
    expect($.get).toBeCalledWith(resources.ALL_USERS);
  });
});
