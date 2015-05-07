var React = require('react');
var TeamActions = require('../actions/TeamActions');
var Icon = require('./Icon.jsx');
var RemoveAsset = require('./RemoveAsset.jsx');
var resources = require('./resources');

var AssetItem = React.createClass({
  render: function() {
    var ResourceAssetItem = resources[this.props.resourceName].assetItem
    var deleteIcon = (this.props.canRemove) ? <RemoveAsset teamName={this.props.teamName} resourceName={this.props.resourceName} assetId={this.props.asset.id} /> : '';
    return (
      <li className='list-item asset-item'>
        {deleteIcon}
        <ResourceAssetItem {...this.props}/>
      </li>
    )
  }
});

module.exports = AssetItem;
