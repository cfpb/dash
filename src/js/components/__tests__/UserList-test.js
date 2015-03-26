/** @jsx React.DOM */

jest.dontMock('../UserList.jsx')
  .dontMock('jquery');

describe('List of users', function() {
  it('should contain some users', function() {
    var React = require('react/addons');
    var UserList = require('../UserList.jsx');
    var TestUtils = React.addons.TestUtils;

    var memberUsers = [
      {'name': 'c7a9d8c1c0516c0910f7b2013e004675', 'data': {'username': 'ascott1'}},
      {'name': 'c7a9d8c1c0516c0910f7b2013e0124b6', 'data': {'username': 'dpford'}},
      {'name': 'c7a9d8c1c0516c0910f7b2013e02c275', 'data': {'username': 'virtix'}}
    ];

    var adminUsers = [
      {'name': 'c7a9d8c1c0516c0910f7b2013e004675', 'data': {'username': 'ascott1'}},
      {'name': 'c7a9d8c1c0516c0910f7b2013e0124b6', 'data': {'username': 'dpford'}},
      {'name': 'c7a9d8c1c0516c0910f7b2013e02c275', 'data': {'username': 'virtix'}},
      {'name': 'c7a9d8c1c0516c0910f7b2013e02c223', 'data': {'username': 'ooblioob'}}
    ];

    var userList = TestUtils.renderIntoDocument(
      <UserList users={memberUsers} />
    );

    var adminList = TestUtils.renderIntoDocument(
      <UserList users={adminUsers} />
    );

    var numUsers = TestUtils.scryRenderedDOMComponentsWithClass(userList, 'user-item').length;
    expect(numUsers).toEqual(3);

    var numAdmins = TestUtils.scryRenderedDOMComponentsWithClass(adminList, 'user-item').length;
    expect(numAdmins).toEqual(4);
  });
});
