jest.dontMock('../AddMember.jsx')
  .dontMock('../Icon.jsx');

var React,
  AddMember,
  TestUtils,
  Icon,
  AddMemberComponent;

describe('Add member component', function() {
  beforeEach(function() {
    React = require('react/addons');
    AddMember = require('../AddMember.jsx');
    Icon = require('../Icon.jsx');
    TestUtils = React.addons.TestUtils;
    var users = [];
    AddMemberComponent = TestUtils.renderIntoDocument(
      <AddMember users ={users}/>
    );
  });

  it('render the component properly', function() {
    var result = AddMemberComponent.getDOMNode();
    expect(result.className).toBe('add-item')
  });
});
