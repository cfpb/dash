jest.dontMock('../RemoveAsset.jsx');

describe('Remove asset icon', function() {
    var React, RemoveAsset, RemoveAssetComponent, TestUtils;
    beforeEach(function() {
      React = require('react/addons');
      RemoveAsset = require('../RemoveAsset.jsx');
      TestUtils = React.addons.TestUtils;
      RemoveAssetComponent = TestUtils.renderIntoDocument(
        <RemoveAsset/>
      );
    });

    it('should render the component', function() {
      var result = RemoveAssetComponent.getDOMNode();
      expect(result.className).toBe('remove-item')
    });
  }
);
