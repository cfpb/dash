var React = require('react');
var common = require('../utils/common');
var UserStore = require('../stores/UserStore');
var Button = require('./Button.jsx');
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
      userInfo = <div>
        <span className="cf-icon cf-icon-user">
          {this.state.username}
        </span>
        <span className="user-role_role">
          {this.state.roles[0]}
        </span>
      </div>;
    } else {
      userInfo = <Button label='Log into DevDash' type='link' />
    }
    return (
      <div className='current-user'>
        {userInfo}
      </div>
    )
  }
});

module.exports = CurrentUserInfo;
