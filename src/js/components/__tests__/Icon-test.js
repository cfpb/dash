jest.dontMock('../Icon.jsx');

describe('An icon', function() {
  var React, TestUtils, Icon;
  beforeEach(function() {
    React = require('react/addons');
    Icon = require('../Icon.jsx');
    TestUtils = React.addons.TestUtils;
  });

  it('should default to being an error icon', function() {
    var icon = TestUtils.renderIntoDocument(
      <Icon />
    );
    var node = icon.getDOMNode();
    expect(node.className).toEqual('cf-icon cf-icon-error');
  });

  it('should become other types of icons', function() {
    var icon = TestUtils.renderIntoDocument(
      <Icon type='phone' />
    );
    var icon2 = TestUtils.renderIntoDocument(
      <Icon type='document-round' />
    );
    expect(icon.getDOMNode().className).toEqual('cf-icon cf-icon-phone');
    expect(icon2.getDOMNode().className).toEqual('cf-icon cf-icon-document-round');
  });

});
