var React = require('react');
var CurrentUserInfo = require('./CurrentUserInfo.jsx');
var Icon = require('./Icon.jsx');

var Header = React.createClass({

  render: function() {
    var loggedInUser = this.props.loggedInUser;
    return (
      <header className="masthead wrapper wrapper__match-content" role="banner">
        <h1 className="masthead_logo">
          <Icon type="web-round" />
          DevDash
        </h1>
        <div className="masthead_user user-meta">
          <CurrentUserInfo loggedInUser={loggedInUser} />
        </div>
      </header>
    );
  }

});

module.exports = Header;
