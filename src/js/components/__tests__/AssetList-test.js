jest.dontMock('../AssetList.jsx')
  .dontMock('../AssetItem.jsx');
var React, AssetList, TestUtils;

describe('List of assets', function() {
  beforeEach(function() {
    React = require('react/addons');
    AssetList = require('../AssetList.jsx');
    TestUtils = React.addons.TestUtils;
  });

  it('should contain 2 assets', function() {

    /* eslint-disable */
    var assets = [
      {
        id: 'id-1',
        gh_id: 1,
        name: 'repo_name',
        full_name: 'url/repo_name'
      },
      {
        id: 'id-2',
        gh_id: 2,
        name: 'repo_name2',
        full_name: 'url/repo_name2'
      }
    ];
    /* eslint-enable */

    var assetList = TestUtils.renderIntoDocument(
      <AssetList assets={assets} resourceName={'gh'} />
    );

    var numAssets = TestUtils.scryRenderedDOMComponentsWithClass(assetList, 'asset-list');

    expect(numAssets[0].props.children.length).toEqual(2);
    expect(numAssets[0].props.children[0].type.displayName).toBe('AssetItem');

  });

  it('should display a message if there are no assets', function() {
    var emptyAssetList = TestUtils.renderIntoDocument(
      <AssetList resourceName={'gh'} />
    );
    var msg = emptyAssetList.getDOMNode().textContent;
    expect(msg).toBe('no assets found');
  });

});
