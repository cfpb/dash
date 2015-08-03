var React = require('react');

var assetItem = React.createClass({
  render: function() {
    var instance
    try {
      instance = this.props.assetDetail.instances[0] || {};
    } catch(e) {
      instance = {}
    }
    var name = this.props.asset.name;
    return (
      <span className="moirai-asset-detail">{name} <code className="asset-meta">({instance.ip}, status: {instance.state})</code></span>
    );
  }
});

module.exports = assetItem;
