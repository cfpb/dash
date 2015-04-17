var React = require('react');
var MemberItem = require('./MemberItem.jsx');

var MemberList = React.createClass({

  render: function() {
    var that = this;
    var Users = this.props.users.map(function(user) {
      return <MemberItem user={user} key={user.get('name')} canRemove={that.props.canRemove} teamName={that.props.teamName} roleName={that.props.roleName} />;
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

module.exports = MemberList;
