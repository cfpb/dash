var React = require('react');
var CurrentUserInfo = require('./CurrentUserInfo.jsx');
var Icon = require('./Icon.jsx');

var Header = React.createClass({

  render: function() {
    return (
      <header className="masthead wrapper wrapper__match-content" role="banner">
        <h1 className="masthead_logo">
          <Icon type="web-round" />
          DevDash
        </h1>
        <div className="masthead_user user-meta">
          <CurrentUserInfo loggedIn={this.props.loggedIn} username={this.props.username} roles={this.props.roles} />
        </div>
      </header>
    );
  }

});

module.exports = Header;
