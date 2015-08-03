jest.dontMock('../AddMember.jsx')
  .dontMock('../Icon.jsx')
  .dontMock('lodash');

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
    var users = [
      {
        data: {username: 'foo'},
        get: function( req ) {
          return this[req];
        }
      },
      {
        data: {username: 'bar'},
        get: function( req ) {
          return this[req];
        }
      }

    ];
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
  it('it should trigger typeahead', function() {
    AddMemberComponent.setState({isOpen: true});
    var typeahead = React.addons.TestUtils.scryRenderedDOMComponentsWithTag(AddMemberComponent, 'input')[0];
    React.addons.TestUtils.Simulate.change(typeahead, {target: {value: 'foo'}});

    expect(AddMemberComponent.state.selectedUser.data.username).toBe('foo')
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

  it('should trigger add when enter is pressed', function() {
    var teamAction = require('../../actions/TeamActions.js');
    spyOn(teamAction, 'addMember');
    AddMemberComponent.setState({isOpen: true});
    AddMemberComponent.setState({selectedUser: {id: 'haiiiii'}});
    var searchInput = React.addons.TestUtils.scryRenderedDOMComponentsWithTag(AddMemberComponent, 'input')[0];

    React.addons.TestUtils.Simulate.keyDown(searchInput, {key: 'Enter'});

    expect(teamAction.addMember).toHaveBeenCalled();

  });
  it('should not trigger is there not selected user', function() {
    var teamAction = require('../../actions/TeamActions.js');
    spyOn(teamAction, 'addMember');
    AddMemberComponent.setState({isOpen: true});
    var searchInput = React.addons.TestUtils.scryRenderedDOMComponentsWithTag(AddMemberComponent, 'input')[0];

    React.addons.TestUtils.Simulate.keyDown(searchInput, {key: 'Enter'});

    expect(teamAction.addMember).not.toHaveBeenCalled();

  });
});
