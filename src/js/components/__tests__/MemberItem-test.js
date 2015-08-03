jest.dontMock('../MemberItem.jsx');
jest.dontMock('../RemoveMember.jsx');


describe('Individual user item', function() {
  var React, MemberItem, TestUtils, userItem, userData, canRemove, Link;

  beforeEach(function() {
    React = require('react/addons');
    MemberItem = require('../MemberItem.jsx');
    TestUtils = React.addons.TestUtils;
    userData = {
      get: function( param ) {
        return {username: 'Barbara Toothsmith'};
      },
      id: '1'
    };
  });
  it('should load a div with user and delete icon', function() {
    canRemove = true;
    userItem = TestUtils.renderIntoDocument(
      <MemberItem user={userData} canRemove={canRemove} teamName={"foo"} roleName={"member"} />
    );
    var secondNodeInComponent = userItem.getDOMNode().childNodes[1];
    var removeIcon = userItem.getDOMNode().childNodes[0];
    expect(removeIcon.className).toBe('remove-item')
    expect(secondNodeInComponent.className).toEqual('user-link');
    expect(secondNodeInComponent.textContent).toEqual('Barbara Toothsmith');
  });

  it('should not have delete icon', function() {
    canRemove = false;
    userItem = TestUtils.renderIntoDocument(
      <MemberItem user={userData} canRemove={canRemove}/>
    );
    var removeIcon = userItem.getDOMNode().childNodes[0];
    expect(removeIcon.className).toBe('')

  });
});
