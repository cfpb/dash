jest.dontMock('../UserItem.jsx');
describe('Individual user item', function() {
  it('should load a div', function() {
    var React = require('react/addons');
    var UserItem = require('../UserItem.jsx');
    var TestUtils = React.addons.TestUtils;

    var userItem = TestUtils.renderIntoDocument(
      <UserItem name="Barbara Toothsmith" />
    );

    var secondNodeInComponent = userItem.getDOMNode().childNodes[1];
    expect(secondNodeInComponent.className).toEqual('user-name');
    expect(secondNodeInComponent.textContent).toEqual('Barbara Toothsmith');
  });
});
