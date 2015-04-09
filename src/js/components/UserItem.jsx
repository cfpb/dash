var React = require('react');
var TeamActions = require('../actions/TeamActions');
var Icon = require('./Icon.jsx');
var RemoveItem = require('./RemoveItem.jsx');

var UserItem = React.createClass({

  // handleClick: function() {
  //   var opts = {
  //     orgName: 'devdesign',
  //     teamName: this.props.teamName,
  //     roleType: 'member',
  //     userId: this.props.userData.name
  //   }
  //   this._removeUser(opts);
  // },

  // _removeUser: function(opts) {
  //   TeamActions.removeUser(opts);
  // },
  handleRemove: function(e) {
    console.log('Remove User!');
  },
  render: function() {
    var name = this.props.user.get('data').username;
    deleteIcon = (this.props.canRemove) ? <RemoveItem teamName={this.props.teamName} role={this.props.role} userId={this.props.user.id} /> : '';
    return (
      <li className='user-item'>
        {deleteIcon}
        <span className='user-name'>{name}</span>
      </li>
    )
  }

});

module.exports = UserItem;
