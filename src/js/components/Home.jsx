var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Breadcrumbs = require('react-breadcrumbs');

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <Breadcrumbs breadcrumbName='Home' />
        <ul>
          <li><Link to="Teams">Teams page</Link></li>
          <li><Link to="Users">Users page</Link></li>
          <li><Link to="Resources">Resources page</Link></li>
        </ul>
      </div>
    );
  }
});

module.exports = Home;
