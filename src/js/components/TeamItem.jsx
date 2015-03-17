var React = require('react');
var UserList = require('./UserList.jsx');
var Button = require('./Button.jsx');
var Icon = require('./Icon.jsx');
var TeamActions = require('../actions/TeamActions');
var $ = require('jquery');

var TeamItem = React.createClass({

  _addUser: function(opts) {
    TeamActions.addUser(opts);
  },

  _toggleSection: function(event) {
    $(event.target).parent().next().slideToggle();
  },

  render: function() {
    return (
      <div className="team-item">
        <h2 className="team-name">
          {this.props.name}
        </h2>
        <div className="user-role">
          <Icon type="user" /><span>admin, user</span>
        </div>
        <div className="admins-and-members">
          <h2 className="admins-header" onClick={this._toggleSection}>Admins ({this.props.adminUsers.length})</h2>
          <div className="admins-list hidden">
            <UserList users={this.props.adminUsers} />
          </div>
          <h2 className="members-header" onClick={this._toggleSection}>Members ({this.props.memberUsers.length})</h2>
          <div className="members-list hidden">
            <UserList users={this.props.memberUsers} />
            <Button href="#" label="Add User" onClick={this._addUser} />
          </div>
        </div>
      </div>
    )
  }

});

module.exports = TeamItem;
