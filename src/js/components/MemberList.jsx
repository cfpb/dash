var React = require('react');
var MemberItem = require('./MemberItem.jsx');

var MemberList = React.createClass({

  render: function() {
    var that = this,
        Members;
    if (this.props.users.length > 0) {
      Members = this.props.users.map(function(user) {
        return <MemberItem user={user} key={user.get('name')} canRemove={that.props.canRemove} teamName={that.props.teamName} roleName={that.props.roleName} />;
      });
    } else {
      Members = <li className="list-item"><em>no {this.props.roleName}s found</em></li>;
    }
    return (
      <div>
        <ul className="user-list">
           {Members}
        </ul>
      </div>
    )

  }

});

module.exports = MemberList;
