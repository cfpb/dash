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
      <span className="moirai-asset-detail">
        <h4>{name}</h4>
        <span>{instance.ip}</span>
        <span>{instance.state}</span>
      </span>
    );
  }
});

module.exports = assetItem;
