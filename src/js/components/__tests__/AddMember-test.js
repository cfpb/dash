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

  it('should display the input box on click', function() {
    var result = React.findDOMNode(AddMemberComponent.refs['plus-icon']);
    React.addons.TestUtils.Simulate.click(result);
    expect(AddMemberComponent.state.isOpen).toBeTruthy();
    expect(AddMemberComponent.getDOMNode().className).toBe('add-item');
  });

  it('should close input box on close', function() {
    AddMemberComponent.setState({isOpen: true});

    var minus = React.findDOMNode(AddMemberComponent.refs['minus-icon']);
    React.addons.TestUtils.Simulate.click(minus);

    expect(AddMemberComponent.state.isOpen).toBeFalsy();
    expect(AddMemberComponent.getDOMNode().className).toBe('add-item');
  });

  it('should invoke TeamActions AddMember method and input window closed', function() {
    var teamAction = require('../../actions/TeamActions.js');
    spyOn(teamAction, 'addMember');
    AddMemberComponent.setState({isOpen: true});
    AddMemberComponent.setState({selectedUser: {id: 'virginia'}});

    var plus = React.findDOMNode(AddMemberComponent.refs['plus-icon']);
    React.addons.TestUtils.Simulate.click(plus);

    expect(teamAction.addMember).toHaveBeenCalled();
    expect(AddMemberComponent.getDOMNode().className).toBe('add-item');
  });
});
