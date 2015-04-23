jest.dontMock('../MemberList.jsx');

describe('List of users', function() {
  it('should contain some users', function() {
    var React = require('react/addons');
    var MemberList = require('../MemberList.jsx');
    var TestUtils = React.addons.TestUtils;

    var memberUsers = [
      {
        get: function() {
          return 'c7a9d8c1c0516c0910f7b2013e004675';
        }, 'name': 'c7a9d8c1c0516c0910f7b2013e004675', 'data': {'username': 'ascott1'}
      }
      ,
      {
        get: function() {
          return 'c7a9d8c1c0516c0910f7b2013e0124b6';
        }, 'name': 'c7a9d8c1c0516c0910f7b2013e0124b6', 'data': {'username': 'dpford'}
      },
      {
        get: function() {
          return 'c7a9d8c1c0516c0910f7b2013e02c275';
        }, 'name': 'c7a9d8c1c0516c0910f7b2013e02c275', 'data': {'username': 'virtix'}
      }
    ];

    var userList = TestUtils.renderIntoDocument(
      <MemberList users={memberUsers} />
    );

    var numUsers = TestUtils.scryRenderedDOMComponentsWithClass(userList, 'user-list');
    console.log(numUsers[0].props.children.length);
   expect(numUsers[0].props.children.length).toEqual(3);
    //
    //var numAdmins = TestUtils.scryRenderedDOMComponentsWithClass(adminList, 'user-list');
    //expect(numAdmins).toEqual(4);
  });
});
