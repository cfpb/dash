jest.dontMock('../src/CheckboxWithLabel.js');

React = require('react/addons')
CheckboxWithLabel = require('../src/CheckboxWithLabel.js')
TestUtils = React.addons.TestUtils


describe "CheckboxWithLabel", () ->
  it "is off by default", () ->
    checkbox = TestUtils.renderIntoDocument(
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    )
    # "

    label = TestUtils.findRenderedDOMComponentWithTag(
         checkbox, 'label')  
    expect(label.getDOMNode().textContent).toEqual('Off')


  it "changes the text after click", () ->
    checkbox = TestUtils.renderIntoDocument(
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    )
    # "

    label = TestUtils.findRenderedDOMComponentWithTag(
         checkbox, 'label')  
    input = TestUtils.findRenderedDOMComponentWithTag(
          checkbox, 'input');
    
    TestUtils.Simulate.change(input);

    expect(label.getDOMNode().textContent).toEqual('On')

