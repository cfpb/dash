var React = require('react');
var UserList = require('./UserList.jsx');
var TeamActions = require('../actions/TeamActions');

var TeamItem = React.createClass({

  _addUser: function(opts) {
    TeamActions.addUser(opts);
  },

  render: function() {
    return (
      <div className="team-item">
        <div className="team-name">{this.props.name}</div>
        <button onClick={this._addUser}>Add User</button>
        <UserList users={this.props.users} />
      </div>
    )
  }

});

module.exports = TeamItem;
