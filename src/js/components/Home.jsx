var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
  render: function() {
    return (
      <ul>
        <li><Link to="teams">Teams page</Link></li>
        <li><Link to="users">Users page</Link></li>
        <li><Link to="resources">Resources page</Link></li>
      </ul>
    );
  }
});

module.exports = Home;
