var React = require('react');
var TeamActions = require('../actions/TeamActions');
var Icon = require('./Icon.jsx');
var RemoveAsset = require('./RemoveAsset.jsx');

var AssetItem = React.createClass({
  render: function() {
    var name = this.props.asset.name;
    deleteIcon = (this.props.canRemove) ? <RemoveAsset teamName={this.props.teamName} resourceName={this.props.resourceName} assetId={this.props.asset.id} /> : '';
    return (
      <li className='asset-item'>
        {deleteIcon}
        <span className='asset-name'>{name}</span>
      </li>
    )
  }

});

module.exports = AssetItem;
