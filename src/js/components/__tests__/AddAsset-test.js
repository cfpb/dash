jest.dontMock('../AddAsset.jsx')
  .dontMock('../Icon.jsx');

var React,
  AddAsset,
  TestUtils,
  Icon,
  asset,
  addAssetComponent;

describe('Add asset component', function() {
  beforeEach(function() {
    React = require('react/addons');
    AddAsset = require('../AddAsset.jsx');
    Icon = require('../Icon.jsx');
    TestUtils = React.addons.TestUtils;

    addAssetComponent = TestUtils.renderIntoDocument(
      <AddAsset teamName={''}/>
    );
  });

  it('render the component properly', function() {
    var result = addAssetComponent.getDOMNode();
    expect(result.className).toBe('add-item')
  });

  it('should display the input box on click', function() {
    var result = React.findDOMNode(addAssetComponent.refs['plus-icon']);
    React.addons.TestUtils.Simulate.click(result);
    expect(addAssetComponent.state.isOpen).toBeTruthy();
    expect(addAssetComponent.getDOMNode().className).toBe('add-item');
  });

  it('should close input box on close', function() {
    addAssetComponent.setState({isOpen: true});

    var minus = React.findDOMNode(addAssetComponent.refs['minus-icon']);
    React.addons.TestUtils.Simulate.click(minus);

    expect(addAssetComponent.state.isOpen).toBeFalsy();
    expect(addAssetComponent.getDOMNode().className).toBe('add-item');
  });

  it('should invoke TeamActions addAsset method and input window closed', function() {
    var teamAction = require('../../actions/TeamActions.js');
    spyOn(teamAction, 'addAsset');
    addAssetComponent.setState({isOpen: true});
    addAssetComponent.setState({assetName: 'virginia'});

    var plus = React.findDOMNode(addAssetComponent.refs['plus-icon']);
    React.addons.TestUtils.Simulate.click(plus);

    expect(teamAction.addAsset).toHaveBeenCalled();
    expect(addAssetComponent.getDOMNode().className).toBe('add-item');
  });

  it('should not do anything is less then 3 characters were typed in', function() {
    var teamAction = require('../../actions/TeamActions.js');
    spyOn(teamAction, 'addAsset');
    addAssetComponent.setState({isOpen: true});
    addAssetComponent.setState({assetName: 'FU'});

    var plus = React.findDOMNode(addAssetComponent.refs['plus-icon']);
    React.addons.TestUtils.Simulate.click(plus);

    expect(teamAction.addAsset).not.toHaveBeenCalled();
    expect(addAssetComponent.getDOMNode().className).toBe('add-item');
  });

  it('should trigger add when enter is pressed', function() {
    var teamAction = require('../../actions/TeamActions.js');
    spyOn(teamAction, 'addAsset');
    addAssetComponent.setState({isOpen: true});
    addAssetComponent.setState({assetName: 'haiiiii'});
    var searchInput = React.findDOMNode(addAssetComponent.refs.input);
    React.addons.TestUtils.Simulate.keyDown(searchInput, {key: 'Enter'});

    expect(teamAction.addAsset).toHaveBeenCalled();

  });

  it('should set the state to the search string', function() {
    var searchText = 'haiiiii';
    addAssetComponent.setState({isOpen: true});
    addAssetComponent.setState({assetName: ''});
    var searchInput = React.findDOMNode(addAssetComponent.refs.input);
    React.addons.TestUtils.Simulate.change(searchInput, {target: {value: searchInput}});

    expect(addAssetComponent.state.assetName).toBe(searchInput);
  });
});
