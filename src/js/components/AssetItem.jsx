var React = require('react');
var Button = require('./Button.jsx');
var Icon = require('./Icon.jsx');
var $ = require('jquery');

var AssetItem = React.createClass({

  handleClick: function() {
    var opts = {
      name: this.props.name
    }
    this._removeAsset(opts);
  },

  _removeAsset: function(opts) {
    // TeamActions.removeUser(opts);
  },

  render: function() {
    return (
      <li className='asset-item'>
        <a href='#' onClick={this.handleClick}>
          <Icon type='delete-round' />
        </a>
        <span className='asset-name'>{this.props.name}</span>
      </li>
    )
  }

});

module.exports = AssetItem;
