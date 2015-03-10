jest.dontMock('../Button.jsx');
describe('A button', function() {
  var React, TestUtils, Button;
  beforeEach(function() {
    React = require('react/addons');
    Button = require('../Button.jsx');
    TestUtils = React.addons.TestUtils;
  });

  it('should have a default label', function() {
    var button = TestUtils.renderIntoDocument(
      <Button />
    );
    var node = button.getDOMNode();
    expect(node.textContent).toEqual('Click here!');
  });

  it('should accept a type and pass it to its class', function() {
    var button = TestUtils.renderIntoDocument(
      <Button label='i heart buttons' type='foo' />
    );
    var node = button.getDOMNode();
    expect(node.className).toEqual('btn foo');
  });

  it('should accept multiple types and pass them to its class', function() {
    var arr = ['foo', 'bar'];
    var button = TestUtils.renderIntoDocument(
      <Button label='i heart buttons' type={arr} />
    );
    var node = button.getDOMNode();
    expect(node.className).toEqual('btn foo bar');
  });

});
