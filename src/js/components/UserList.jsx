var React = require('react');
var UserItem = require('./UserItem.jsx');

var UserList = React.createClass({

  render: function() {
    var Users = this.props.users.map(function(user) {
      return <UserItem user={user} key={user.get('name')}/>;
    });
    return (
      <div>
        <ul className="user-list">
          {Users}
        </ul>
      </div>
    )

  }

});

module.exports = UserList;
