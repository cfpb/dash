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
      loggedIn: false
    };
  },

  componentDidMount: function() {
    var userPromise = getUser();
    userPromise.then(function(user) {
      this.setState({
        loggedIn: true,
        username: user.data.username,
        roles: user.roles
      })
    }.bind(this));
    userPromise.fail(function(user) {
      this.setState({
        loggedIn: false
      })
    }.bind(this));
  },
  render: function() {
    var userInfo;
    if (this.state.loggedIn) {
      userInfo = <div className="current-user">
        <span className="cf-icon cf-icon-user">
        {this.state.username}</span>
        <div className="user-role_role">
                 {this.state.roles[0]}
        </div>
      </div>;
    } else {
      userInfo = <div>go to hell</div>
    }
    return (
      <div>
    {userInfo}
      </div>
    )
  }
});

module.exports = CurrentUserInfo;
