jest.dontMock('../MemberList.jsx');

describe('List of users', function(){
  var React, MemberList, TestUtils;

  beforeEach(function(){
    React = require('react/addons');
    MemberList = require('../MemberList.jsx');
    TestUtils = React.addons.TestUtils;
  });

  it('should contain some users', function(){
    var memberUsers = [
      {
        get: function(){
          return 'c7a9d8c1c0516c0910f7b2013e004675';
        },
        'name': 'c7a9d8c1c0516c0910f7b2013e004675',
        'data': {'username': 'ascott1'}
      }
      ,
      {
        get: function(){
          return 'c7a9d8c1c0516c0910f7b2013e0124b6';
        },
        'name': 'c7a9d8c1c0516c0910f7b2013e0124b6', 'data': {'username': 'dpford'}
      },
      {
        get: function(){
          return 'c7a9d8c1c0516c0910f7b2013e02c275';
        },
        'name': 'c7a9d8c1c0516c0910f7b2013e02c275',
        'data': {'username': 'virtix'}
      }
    ];

    var userList = TestUtils.renderIntoDocument(
      <MemberList users={memberUsers}/>
    );

    var numUsers = TestUtils.scryRenderedDOMComponentsWithClass(userList, 'user-list');
    expect(numUsers[0].props.children.length).toEqual(3);

  });
  it('should render no members found msg when there are no users', function(){
    var userList = TestUtils.renderIntoDocument(
      <MemberList users={[]} roleName='admin'/>
    );

    var numUsers = TestUtils.scryRenderedDOMComponentsWithClass(userList, 'user-list');
    expect(numUsers[0].getDOMNode().innerHTML).toContain('no', 'admin', 'found' )
    expect(numUsers[0].getDOMNode().children.length).toEqual(1);
  })
});
