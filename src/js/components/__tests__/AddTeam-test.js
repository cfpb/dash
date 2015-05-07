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
    expect(result.className).toBe('add-team')
  });
});
