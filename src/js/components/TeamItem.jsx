var React = require('react');
var UserList = require('./UserList.jsx');
var AssetList = require('./AssetList.jsx');
var Button = require('./Button.jsx');
var Icon = require('./Icon.jsx');
var TeamActions = require('../actions/TeamActions');
var $ = require('jquery');

var TeamItem = React.createClass({

  _addUser: function(opts) {
    TeamActions.addUser(opts);
  },

  _addAsset: function(opts) {
    TeamActions.addAsset(opts);
  },

  _toggleSection: function(event) {
    event.preventDefault();
    $(event.target).parent().next().slideToggle();
  },

  render: function() {

    var roles = [];

    if (this.props.roles) {
      for (var role in this.props.roles) {
        roles.push(role);
      }
    }

    return (
      <div className="team-item">
        <h2 className="team-name">
          {this.props.name}
        </h2>
        <div className="user-role">
          <Icon type="user" /><span>{roles.join(', ')}</span>
        </div>
        <div className="admins-and-members">

          <div onClick={this.props.adminUsers.length ? this._toggleSection : null}>
            <Button className="admins-header" type="link" label={'Admin (' + this.props.adminUsers.length + ')'} />
          </div>
          <div className="admins-list hidden">
            <UserList users={this.props.adminUsers} />
          </div>

          <div onClick={this.props.memberUsers.length ? this._toggleSection : null}>
            <Button className="members-header" type="link" label={'Member (' + this.props.memberUsers.length + ')'} />
          </div>
          <div className="members-list hidden">
            <UserList users={this.props.memberUsers} />
            <Button label="Add User" onClick={this._addUser} />
          </div>

          <div onClick={this.props.assets.length ? this._toggleSection : null}>
            <Button className="assets-header" type="link" label={'Asset (' + this.props.assets.length + ')'} />
          </div>
          <div className="asset-list hidden">
            <AssetList assets={this.props.assets} />
            <Button label="Add Asset" onClick={this._addAsset} />
          </div>

        </div>
      </div>
    )
  }

});

module.exports = TeamItem;
