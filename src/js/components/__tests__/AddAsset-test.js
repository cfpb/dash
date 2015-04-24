jest.dontMock('../AddAsset.jsx');

var React,
  AddAsset,
  TestUtils,
  asset,
  addAssetComponent;

describe('Add asset component', function() {
  beforeEach(function() {
    React = require('react/addons');
    AddAsset = require('../AddAsset.jsx');
    TestUtils = React.addons.TestUtils;

    addAssetComponent = TestUtils.renderIntoDocument(
      <AddAsset/>
    );
  });

  it('render the component properly', function() {

    var result = addAssetComponent.getDOMNode();
    expect(result.className).toBe('add-asset')
  });

  it('should display the imput box on click', function() {
    React.addons.TestUtils.Simulate.click(addAssetComponent);
    //console.log(addAssetComponent);
  });

});
