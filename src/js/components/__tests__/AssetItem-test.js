jest.dontMock('../AssetItem.jsx');
jest.dontMock('../RemoveAsset.jsx');
var React, AssetItem, TestUtils, asset;
describe('Individual asset item', function() {
  beforeEach(function() {
    React = require('react/addons');
    AssetItem = require('../AssetItem.jsx');
    TestUtils = React.addons.TestUtils;

    asset = {
      asset: {
        name: 'foo',
        repo: 'bar/baz',
        id: 'quaz'
      }
    };
  });
  it('should load a div and display remove icon', function() {

    var canRemove = true;

    var assetItem = TestUtils.renderIntoDocument(
      <AssetItem asset={asset} canRemove={canRemove} teamName={"foo"} resourceId={'123'} />
    );
    var removeAsset = assetItem.getDOMNode().childNodes[0];
    expect(removeAsset.className).toBe('remove-asset')
    expect(assetItem.getDOMNode().className).toEqual('asset-item');
  });

  it('should not display remove icon', function() {

    var canRemove = false;

    var assetItem = TestUtils.renderIntoDocument(
      <AssetItem asset={asset} canRemove={canRemove} teamName={"foo"} resourceId={'123'} />
    );
    var removeAsset = assetItem.getDOMNode().childNodes[0];
    expect(removeAsset.className).toBe('')
  });
});
