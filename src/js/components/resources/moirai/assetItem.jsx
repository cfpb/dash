var React = require('react');

var assetItem = React.createClass({
  render: function() {
    var name = this.props.asset.name;
    return <span className='asset-name'>{name}</span>;
  }
});

module.exports = assetItem;
