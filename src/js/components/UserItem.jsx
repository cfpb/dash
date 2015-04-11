var React = require('react');
var TeamActions = require('../actions/TeamActions');
var Icon = require('./Icon.jsx');
var RemoveUser = require('./RemoveUser.jsx');

var UserItem = React.createClass({

  handleRemove: function(e) {
    console.log('Remove User!');
  },
  render: function() {
    var name = this.props.user.get('data').username;
    deleteIcon = (this.props.canRemove) ? <RemoveUser teamName={this.props.teamName} roleName={this.props.roleName} userId={this.props.user.id} /> : '';
    return (
      <li className='user-item'>
        {deleteIcon}
        <span className='user-name'>{name}</span>
      </li>
    )
  }

});

module.exports = UserItem;
