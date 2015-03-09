var React = require('react');
var common = require('../utils/common');
var UserStore = require('../stores/UserStore');
var $ = require('jquery');

function getUser() {
  return UserStore.getCurrentUser();

}
var CurrentUserInfo = React.createClass({

  getInitialState: function() {
    return {
      username: 'currentUser',
      roles: []
    };
  },

  componentDidMount: function() {
    var userPromise = getUser();
    userPromise.then(function(user) {
      this.setState({
        username: user.data.username,
        roles: user.roles
      })
    }.bind(this));
  },
  render: function() {
    return <div className="current-user">
      <span className="cf-icon cf-icon-user">
        {this.state.username}</span>

      <span className="user-role_role">
                 {this.state.roles[0]}
      </span>
    </div>
  }

});

module.exports = CurrentUserInfo;
