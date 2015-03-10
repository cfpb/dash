var React = require('react');
var TeamActions = require('../actions/TeamActions');
var Icon = require('./Icon.jsx')

var UserItem = React.createClass({

  handleClick: function() {
    var opts = {
      orgName: 'devdesign',
      teamName: this.props.userData.team.name,
      roleType: 'member',
      userId: this.props.userData.name
    }
    this._removeUser(opts);
  },
  _removeUser: function(opts) {
    TeamActions.removeUser(opts);
  },

  render: function() {
    return (
      <li className='user-item'>
        <a href='#' onClick={this.handleClick}>
          <Icon type='delete-round' />
        </a>
        <span className='user-name'>{this.props.name}</span>
      </li>
    )
  }

});

module.exports = UserItem;
