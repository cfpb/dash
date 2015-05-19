jest.dontMock('../RemoveAsset.jsx')
  .dontMock('../Icon.jsx');

describe('Remove asset icon', function() {
    var React, RemoveAsset, RemoveAssetComponent, TestUtils, Icon;
    beforeEach(function() {
      React = require('react/addons');
      RemoveAsset = require('../RemoveAsset.jsx');
      TestUtils = React.addons.TestUtils;
      Icon = require('../Icon.jsx');
      RemoveAssetComponent = TestUtils.renderIntoDocument(
        <RemoveAsset/>
      );
    });

    it('should render the component', function() {
      var result = RemoveAssetComponent.getDOMNode();
      expect(result.className).toBe('remove-item')
    });

    it('should render the confirm markup when state is confirming', function() {
      RemoveAssetComponent.setState({isConfirming: true});
      var result = RemoveAssetComponent.getDOMNode();
      expect(result.className).toBe('remove-item')
    });

    it('should display confirmation box on click', function() {
      RemoveAssetComponent.setState({isConfirming: false});
      var result = React.findDOMNode(RemoveAssetComponent.refs['minus-round']);

      React.addons.TestUtils.Simulate.click(result);
      expect(RemoveAssetComponent.state.isConfirming).toBeTruthy();
      expect(RemoveAssetComponent.getDOMNode().className).toBe('remove-item');
    });

    it('should close input box on cancel', function() {
      RemoveAssetComponent.setState({isConfirming: true});

      var cancel = React.findDOMNode(RemoveAssetComponent.refs.cancel);
      React.addons.TestUtils.Simulate.click(cancel);

      expect(RemoveAssetComponent.state.isConfirming).toBeFalsy();
      expect(RemoveAssetComponent.getDOMNode().className).toBe('remove-item');
    });

    it('should invoke TeamActions removeAsset method and confirm  window closed', function() {
      var teamAction = require('../../actions/TeamActions.js');
      spyOn(teamAction, 'removeAsset');
      RemoveAssetComponent.setState({isConfirming: true});

      var remove = React.findDOMNode(RemoveAssetComponent.refs.remove);
      React.addons.TestUtils.Simulate.click(remove);

      expect(teamAction.removeAsset).toHaveBeenCalled();
      expect(RemoveAssetComponent.getDOMNode().className).toBe('remove-item');
    });
  }
);
