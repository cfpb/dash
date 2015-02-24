/** @jsx React.DOM */

// __tests__/UserItem-test.js

jest.dontMock('../UserItem.jsx');
describe('Individual user item', function() {
  it('should load a div', function() {
    var React = require('react/addons');
    var UserItem = require('../UserItem.jsx');
    var TestUtils = React.addons.TestUtils;

    var userItem = TestUtils.renderIntoDocument(
   		<UserItem name="Barbara Toothsmith" />
    );

    expect(userItem.getDOMNode().textContent).toEqual('Barbara Toothsmith');
  });
});