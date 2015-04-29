var React = require('react');
var AssetItem = require('./AssetItem.jsx');

var AssetList = React.createClass({

  render: function() {
    var that = this;
    var Assets = this.props.assets.map(function(asset) {
      return <AssetItem asset={asset} key={asset.name} canRemove={that.props.canRemove} teamName={that.props.teamName} resourceName={that.props.resourceName} />;
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
