var React = require('react');
var TeamActions = require('../actions/TeamActions');
var Icon = require('./Icon.jsx');
var RemoveMember = require('./RemoveMember.jsx');

var MemberItem = React.createClass({
  render: function() {
    var name = this.props.user.get('data').username;
    var deleteIcon = (this.props.canRemove) ? <RemoveMember teamName={this.props.teamName} roleName={this.props.roleName} userId={this.props.user.id} userName={name} /> : '';
    return (
      <li className='list-item user-item'>
        {deleteIcon}
        <a className="user-link" href={'#/users/' + this.props.user.id}>
          <span className='user-name'>{name}</span>
        </a>
      </li>
    )
  }
});

module.exports = MemberItem;
