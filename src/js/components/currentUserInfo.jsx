var React = require('react');
var common = require('../utils/common');
var UserStore = require('../stores/UserStore');
var Button = require('./Button.jsx');
var $ = require('jquery');

var CurrentUserInfo = React.createClass({

  render: function() {
    var userInfo;
    if (this.props.loggedIn) {
      userInfo = (
        <div>
          <div className='cf-icon cf-icon-user'>
            {this.props.username}
          </div>
          <div className='user-role_role'>
            {this.props.roles}
          </div>
          <Button href='/logout' label='Log out' type='secondary' />
        </div>
      );
    } else {
      userInfo = <Button href='/login' label='Log into DevDash' />
    }
    return (
      <div className='current-user'>
        {userInfo}
      </div>
    )
  }
});

module.exports = CurrentUserInfo;
