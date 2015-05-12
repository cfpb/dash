var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li><Link to="Teams">All Teams</Link></li>
          <li><Link to="Users">All Users</Link></li>
        </ul>
      </div>
    );
  }
});

module.exports = Home;
