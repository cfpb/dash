jest.dontMock('../AssetItem.jsx');

describe('Individual asset item', function() {
  it('should load a div', function() {
    var React = require('react/addons');
    var AssetItem = require('../AssetItem.jsx');
    var TestUtils = React.addons.TestUtils;

    var asset = {
      name: 'foo',
      repo: 'bar/baz',
      id: 'quaz'
    }

    var assetItem = TestUtils.renderIntoDocument(
      <AssetItem name={asset.name} repo={asset.full_name} id={asset.id} />
    );

    expect(assetItem.getDOMNode().className).toEqual('asset-item');
  });
});
