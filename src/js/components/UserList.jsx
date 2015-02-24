var React = require('react');
var UserItem = require('./UserItem.jsx');

var UserList = React.createClass({

  componentWillMount: function() {

    var users = this.props.users;
    // console.log(JSON.stringify(users));

    users = users.map( function( user ) {
      return <UserItem name={user.data.username} key={user.name} />;
    });

    this.setState({
      users: users
    });

    // console.log(this.props.users);

  },

  render: function() {

    return (
      <ul className="user-list">
        {this.state.users}
      </ul>
    )

  }

});

module.exports = UserList;