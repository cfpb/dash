var React = require('react');
var UserItem = require('./UserItem.jsx');

var UserList = React.createClass({

  render: function() {
    var that = this;
    var Users = this.props.users.map(function(user) {
      return <UserItem user={user} key={user.get('name')} canRemove={that.props.canRemove} teamName={that.props.teamName} roleName={that.props.roleName} />;
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
