// __tests__/App-test.js

/** @jsx React.DOM */
jest.dontMock('../../utils/common');

describe('Get all teams method', function () {
  it('should call the teams URL', function () {
    var common = require('../../utils/common'),
        $ = require('jquery');
    common.getAllTeams();
    expect($.get).toBeCalledWith('/kratos/orgs/devdesign/teams');
  });
});

describe('Get all users method', function () {
  it('should call the users URL', function () {
    var common = require('../../utils/common'),
        $ = require('jquery');
    common.getAllUsers();
    expect($.get).toBeCalledWith('/kratos/users');
  });
});