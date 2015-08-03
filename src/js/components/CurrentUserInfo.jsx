var React = require('react');
var Icon = require('./Icon.jsx');
var Button = require('./Button.jsx');
var $ = require('jquery');

var CurrentUserInfo = React.createClass({

  render: function() {
    var loggedInUser = this.props.loggedInUser;

    var userInfo;

    if (loggedInUser.isLoggedIn()) {
      var roles = loggedInUser.get('roles') || [];
      var userData = loggedInUser.get('data') || {};
      var id = loggedInUser.id || {};

      userInfo = (
        <span className="masthead_user user-meta">
          <span className="user-meta_item user-meta_item__first">
            <span className="user-meta_name">
              <Icon type="user"/>
               <a href={'#/users/' + id}>
                 {userData.username}
               </a>
            </span>
            <div>
              <span className="user-role">
                {roles.join(', ').replace(/\|/g, ': ')}
              </span>
            </div>
          </span>
          <span className="user-meta_item user-meta_item__last">
            <Button href="/logout" label="Log out" type={['link', 'warning']}/>
          </span>
        </span>
      );
    } else {
      userInfo = <Button href='/login' label='Log into DevDash'/>
    }
    return (
      <div className='current-user'>
        {userInfo}
      </div>
    )
  }
});

module.exports = CurrentUserInfo;
