jest.dontMock('../AddTeam.jsx')
  .dontMock('../Icon.jsx');

var React,
  AddTeam,
  TestUtils,
  Icon,
  AddTeamComponent;

describe('Add team component', function() {
  beforeEach(function() {
    React = require('react/addons');
    AddTeam = require('../AddTeam.jsx');
    Icon = require('../Icon.jsx');
    TestUtils = React.addons.TestUtils;
    AddTeamComponent = TestUtils.renderIntoDocument(
      <AddTeam/>
    );
  });

  it('render the component properly', function() {
    var result = AddTeamComponent.getDOMNode();
    expect(result.className).toBe('add-item')
  });

  it('should display the input box on click', function() {
    var result = React.findDOMNode(AddTeamComponent.refs['plus-icon']);
    React.addons.TestUtils.Simulate.click(result);
    expect(AddTeamComponent.state.isOpen).toBeTruthy();
    expect(AddTeamComponent.getDOMNode().className).toBe('add-team');
  });

  it('should close input box on close', function() {
    AddTeamComponent.setState({isOpen: true});

    var minus = React.findDOMNode(AddTeamComponent.refs['minus-icon']);
    React.addons.TestUtils.Simulate.click(minus);

    expect(AddTeamComponent.state.isOpen).toBeFalsy();
    expect(AddTeamComponent.getDOMNode().className).toBe('add-item');
  });

  it('should invoke TeamActions AddTeam method and input window closed', function() {
    var teamAction = require('../../actions/TeamActions.js');
    spyOn(teamAction, 'create');
    AddTeamComponent.setState({isOpen: true});
    AddTeamComponent.setState({teamName: 'Victory'});

    var plus = React.findDOMNode(AddTeamComponent.refs['plus-icon']);
    React.addons.TestUtils.Simulate.click(plus);

    expect(teamAction.create).toHaveBeenCalled();
    expect(AddTeamComponent.getDOMNode().className).toBe('add-item');
  });

  it('should not so anything is teamName is less then 3 chars', function() {
    var teamAction = require('../../actions/TeamActions.js');
    spyOn(teamAction, 'create');
    AddTeamComponent.setState({isOpen: true});
    AddTeamComponent.setState({teamName: 'NO'});

    var plus = React.findDOMNode(AddTeamComponent.refs['plus-icon']);
    React.addons.TestUtils.Simulate.click(plus);

    expect(teamAction.create).not.toHaveBeenCalled();
    expect(AddTeamComponent.getDOMNode().className).toBe('add-team');
  });
  it('should set state of teamName on chang events', function(){

  });
});
