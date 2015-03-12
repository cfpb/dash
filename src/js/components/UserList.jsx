var React = require('react');
var UserItem = require('./UserItem.jsx');

var UserList = React.createClass({

  componentWillMount: function() {

    var memberUsers = this.props.memberUsers,
      adminUsers = this.props.adminUsers;

    memberUsers = memberUsers.map(function(user) {
      return <UserItem userData={user} name={user.data.username} key={user.name} />;
    });
    adminUsers = adminUsers.map(function(user) {
      return <UserItem userData={user} name={user.data.username} key={user.name} />;
    });
    this.setState({
      memberUsers: memberUsers,
      adminUsers: adminUsers
    });
  },

  render: function() {

    return (
      <div>
        <h2>Users</h2>
        <ul className="user-list">
          {this.state.memberUsers}
        </ul>
        <h2>Admins</h2>
        <ul>
          {this.state.adminUsers}
        </ul>
      </div>
    )

  }

});

module.exports = UserList;
