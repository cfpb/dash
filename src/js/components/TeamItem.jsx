var React = require('react');
var UserList = require('./UserList.jsx');

var TeamItem = React.createClass({

  render: function() {
    return (
      <div className="team-item">
        <div className="team-name">{this.props.name}</div>
        <UserList users={this.props.users} />
      </div>
    )
  }

});
module.exports = TeamItem;