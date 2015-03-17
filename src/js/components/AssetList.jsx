var React = require('react');
var $ = require('jquery');
var AssetItem = require('./AssetItem.jsx');

var AssetList = React.createClass({

  propTypes: {
    assets: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      assets: []
    };
  },

  render: function() {

    var assets = this.props.assets;

    assets = assets.map(function(asset) {
      return <AssetItem name={asset.name} repo={asset.full_name} id={asset.id} key={asset.id} />;
    });

    return (
      <div className="team-list">
        {assets}
      </div>
    )

  }

});

module.exports = AssetList;
