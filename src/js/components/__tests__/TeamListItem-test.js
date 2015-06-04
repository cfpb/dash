jest.dontMock('../TeamListItem.jsx');

var React, TeamListItem, TestUtils, TeamListItemComponent;

describe('Tea Item', function() {
  beforeEach(function() {
    React = require('react/addons');
    TeamListItem = require('../TeamListItem.jsx');
    TestUtils = React.addons.TestUtils;
    var team = {
      name: 'foo',
      get: function( name ) {
        return this[name];
      }
    }
    TeamListItemComponent = TestUtils.renderIntoDocument(
      <TeamListItem team={team} canRemove={true} />
    );
  });

  it('should should render', function() {
    var result = TeamListItemComponent.getDOMNode();
    expect(result.className).toBe('list-item teams-list-item')
  });
});
