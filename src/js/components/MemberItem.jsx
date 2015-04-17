var React = require('react');
var TeamActions = require('../actions/TeamActions');
var Icon = require('./Icon.jsx');
var RemoveMember = require('./RemoveMember.jsx');

var MemberItem = React.createClass({

  handleRemove: function(e) {
    console.log('Remove User!');
  },
  render: function() {
    var name = this.props.user.get('data').username;
    deleteIcon = (this.props.canRemove) ? <RemoveMember teamName={this.props.teamName} roleName={this.props.roleName} userId={this.props.user.id} /> : '';
    return (
      <li className='user-item'>
        {deleteIcon}
        <span className='user-name'>{name}</span>
      </li>
    )
  }

});

module.exports = MemberItem;
