jest.dontMock('../AssetItem.jsx');
jest.dontMock('../RemoveAsset.jsx');
jest.dontMock('../resources');

var React, AssetItem, TestUtils, asset, resourceName, resources;
describe('Individual asset item', function() {
  beforeEach(function() {
    React = require('react/addons');
    AssetItem = require('../AssetItem.jsx');
    TestUtils = React.addons.TestUtils;
    resources = require('../resources');

    asset = {
      asset: {
        name: 'foo',
        repo: 'bar/baz',
        id: 'quaz'
      }
    };
    resourceName = {gh: {assetItem: asset}}
  });
  it('should load a div and display remove icon', function() {

    var canRemove = true;

    var assetItem = TestUtils.renderIntoDocument(
      <AssetItem asset={asset} canRemove={canRemove} teamName={"foo"} resourceId={'123'} resourceName={'gh'} />
    );
    var removeAsset = assetItem.getDOMNode().childNodes[0];
    expect(removeAsset.className).toBe('remove-item')
    expect(assetItem.getDOMNode().className).toEqual('list-item asset-item');
  });

  it('should not display remove icon', function() {

    var canRemove = false;

    var assetItem = TestUtils.renderIntoDocument(
      <AssetItem asset={asset} canRemove={canRemove} teamName={"foo"} resourceId={'123'} resourceName={'gh'}/>
    );
    var removeAsset = assetItem.getDOMNode().childNodes[0];
    expect(removeAsset.className).toBe('')
  });
});
