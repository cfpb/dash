
jest.dontMock('react-router-stub');
jest.dontMock('../MemberItem.jsx');
jest.dontMock('../RemoveMember.jsx');
jest.dontMock('../RemoveMember.jsx');
//jest.dontMock('react-router');

describe('Individual user item', function() {
  var React, MemberItem, TestUtils, userItem, userData, canRemove, Link;

  beforeEach(function() {
    reactRouterStub = require('react-router-stub');
    React = require('react/addons');
    MemberItem = require('../MemberItem.jsx');
    TestUtils = React.addons.TestUtils;
    Router=require('react-router');
    Link =Router.Link;
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
    expect(removeIcon.className).toBe('remove-component')
    expect(secondNodeInComponent.className).toEqual('user-name');
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
