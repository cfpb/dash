jest.dontMock('../RemoveMember.jsx')
  .dontMock('../Icon.jsx');


describe('Remove member icon', function() {
    var Icon, React, RemoveMember, RemoveMemberComponent, TestUtils;
    beforeEach(function() {
      React = require('react/addons');
      RemoveMember = require('../RemoveMember.jsx');
      Icon = require('../Icon.jsx');
      TestUtils = React.addons.TestUtils;

      RemoveMemberComponent = TestUtils.renderIntoDocument(
        <RemoveMember/>
      );
    });

    it('should should render', function() {
      var result = RemoveMemberComponent.getDOMNode();
      expect(result.className).toBe('remove-item')
    });


    it('should render the confirm markup when state is confirming', function() {
      RemoveMemberComponent.setState({isConfirming: true});
      var result = RemoveMemberComponent.getDOMNode();
      expect(result.className).toBe('remove-item')
    });

    it('should display confirmation box on click', function() {
      RemoveMemberComponent.setState({isConfirming: false});
      var result = React.findDOMNode(RemoveMemberComponent.refs['minus-round']);

      React.addons.TestUtils.Simulate.click(result);
      expect(RemoveMemberComponent.state.isConfirming).toBeTruthy();
      expect(RemoveMemberComponent.getDOMNode().className).toBe('remove-item');
    });

    it('should close input box on cancel', function() {
      RemoveMemberComponent.setState({isConfirming: true});

      var cancel = React.findDOMNode(RemoveMemberComponent.refs.cancel);
      React.addons.TestUtils.Simulate.click(cancel);

      expect(RemoveMemberComponent.state.isConfirming).toBeFalsy();
      expect(RemoveMemberComponent.getDOMNode().className).toBe('remove-item');
    });

    it('should invoke TeamActions removeAsset method and confirm  window closed', function() {
      var teamAction = require('../../actions/TeamActions.js');
      spyOn(teamAction, 'removeMember');
      RemoveMemberComponent.setState({isConfirming: true});

      var remove = React.findDOMNode(RemoveMemberComponent.refs.remove);
      React.addons.TestUtils.Simulate.click(remove);

      expect(teamAction.removeMember).toHaveBeenCalled();
      expect(RemoveMemberComponent.getDOMNode().className).toBe('remove-item');
    });


  }
);
