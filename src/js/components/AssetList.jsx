var React = require('react');
var AssetItem = require('./AssetItem.jsx');
var _ = require('lodash');

var AssetList = React.createClass({

  render: function() {
    var that = this,
        assetDetails = this.props.assetDetails,
        Assets;
    if (this.props.assets && this.props.assets.length > 0) {
      Assets = this.props.assets.map(function(asset) {
        var assetDetail = (_.findWhere(assetDetails, {id: asset.id}) || {details: {}}).details;
        return (
            <AssetItem asset={asset} key={asset.name}
              canRemove={that.props.canRemove}
              teamName={that.props.teamName}
              resourceName={that.props.resourceName}
              assetDetail={assetDetail} />
          )
      });
    } else {
      Assets = <li ref="no-assets" className="list-item"><em>no assets found</em></li>;
    }
    return (
      <div>
        <ul className="asset-list">
          {Assets}
        </ul>
      </div>
    )

  }

});

module.exports = AssetList;
