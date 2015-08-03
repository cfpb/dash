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
  it('should set state of teamName on change events', function(){
    var searchText = 'yolo';
    AddTeamComponent.setState({isOpen: true});
    AddTeamComponent.setState({teamName: ''});
    var searchInput = React.findDOMNode(AddTeamComponent.refs.input);
    React.addons.TestUtils.Simulate.change(searchInput, {target: {value: searchInput}});

    expect(AddTeamComponent.state.teamName).toBe(searchInput);
  });


  it('should trigger add when enter is pressed', function() {
    var teamAction = require('../../actions/TeamActions.js');
    spyOn(teamAction, 'create');
    AddTeamComponent.setState({isOpen: true});
    AddTeamComponent.setState({teamName: 'haiiiii'});
    var searchInput = React.findDOMNode(AddTeamComponent.refs.input);
    React.addons.TestUtils.Simulate.keyDown(searchInput, {key: 'Enter'});

    expect(teamAction.create).toHaveBeenCalled();

  });
});
