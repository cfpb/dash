jest.dontMock('../RemoveMember.jsx');

describe('Remove member icon', function() {
    var React, RemoveMember, RemoveMemberComponent, TestUtils;
    beforeEach(function() {
      React = require('react/addons');
      RemoveMember = require('../RemoveMember.jsx');
      TestUtils = React.addons.TestUtils;
      RemoveMemberComponent = TestUtils.renderIntoDocument(
        <RemoveMember/>
      );
    });

    it('should should render', function() {
      var result = RemoveMemberComponent.getDOMNode();
      expect(result.className).toBe('remove-item')
    });
  }
);
