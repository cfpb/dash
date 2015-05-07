var React = require('react');
var Button = require('./Button.jsx');
var Icon = require('./Icon.jsx');
var Router = require('react-router');
// var RemoveAsset = require('./RemoveAsset.jsx');
var Link = Router.Link;

var TeamListItem = React.createClass({

  render: function() {

    // var deleteIcon = (this.props.canRemove) ? <RemoveAsset teamName={this.props.teamName} resourceName={this.props.resourceName} assetId={this.props.asset.id} /> : '';

    return (
      <li className="list-item teams-list-item">
        <Link to="Team" params={{teamName: this.props.team.get('name')}}>{this.props.team.get('name')}</Link>
      </li>
    )
  }

});

module.exports = TeamListItem;
