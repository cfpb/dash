var React = require('react');
var AssetItem = require('./AssetItem.jsx');
var _ = require('lodash');

var AssetList = React.createClass({

  render: function() {
    var that = this;
    var assetDetails = this.props.assetDetails;
    var Assets = this.props.assets.map(function( asset ) {
      var assetDetail = (_.findWhere(assetDetails, {id: asset.id}) || {details: {}}).details;
      return <AssetItem asset={asset} key={asset.name}
        canRemove={that.props.canRemove}
        teamName={that.props.teamName}
        resourceName={that.props.resourceName}
        assetDetail={assetDetail} />;
    });
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
