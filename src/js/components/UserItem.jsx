var React = require('react');
var TeamActions = require('../actions/TeamActions');

var UserItem = React.createClass({

  _removeUser: function(opts) {
    TeamActions.removeUser(opts);
  },

  render: function() {
    return (
      <li className="user-item">
        <button onClick={this._removeUser}>Remove user</button>
        <span className="user-name">{this.props.name}</span>
      </li>
    )
  }

});

module.exports = UserItem;
