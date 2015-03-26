jest.dontMock('../AssetList.jsx')
    .dontMock('jquery');

describe('List of teams', function() {
  it('should contain some teams', function() {
    var React = require('react/addons');
    var AssetList = require('../AssetList.jsx');
    var TestUtils = React.addons.TestUtils;

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
      <AssetList assets={assets} />
    );

    var numAssets = TestUtils.scryRenderedDOMComponentsWithClass(assetList, 'asset-item').length;
    expect(numAssets).toEqual(2);

  });
});
