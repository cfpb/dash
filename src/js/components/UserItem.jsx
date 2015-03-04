var React = require('react');
var TeamActions = require('../actions/TeamActions');

var UserItem = React.createClass({

  handleClick: function() {
    console.log(this.props.userData);
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
      <li className="user-item">
        <button onClick={this.handleClick}>Remove user</button>
        <span className="user-name">{this.props.name}</span>
      </li>
    )
  }

});

module.exports = UserItem;
