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
      <section className="teams_item">
        <div className="expandable expandable__padded expandable__team">

          <h1 className="expandable_label">
            {this.props.name}
          </h1>
          <div className="expandable_role corner-badge corner-badge__user">
            <span className="corner-badge_label">{roles.join(', ')}</span>
          </div>
          <div className="expandable_actions">

            <div className="expandable_header-left">
              <div className="expandable_header-link" onClick={this.props.adminUsers.length ? this._toggleSection : null}>
                <Button className="admins-header" type={['link', 'secondary']} label={'Admin (' + this.props.adminUsers.length + ')'} />
              </div>
              <div className="admins-list hidden">
                <UserList users={this.props.adminUsers} teamName={this.props.name}/>
              </div>

              <div className="expandable_header-link" onClick={this.props.memberUsers.length ? this._toggleSection : null}>
                <Button className="members-header" type={['link', 'secondary']} label={'Member (' + this.props.memberUsers.length + ')'} />
              </div>
              <div className="members-list hidden">
                <UserList users={this.props.memberUsers} teamName={this.props.name}/>
                <Button label="Add User" onClick={this._addUser} />
              </div>
            </div>

            <div className="expandable_header-right">
              <div onClick={this.props.assets.length ? this._toggleSection : null}>
                <Button className="assets-header" type={['link', 'secondary']} label={'Asset (' + this.props.assets.length + ')'} />
              </div>
              <div className="assets-list hidden">
                <AssetList assets={this.props.assets} />
                <Button label="Add Asset" onClick={this._addAsset} />
              </div>
            </div>

          </div>
        </div>
      </section>
    )
  }

});

module.exports = TeamItem;
