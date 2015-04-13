var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./App.jsx')
var Home = require('./Home.jsx');
var TeamPage = require('./TeamPage.jsx');
var TeamsPage = require('./TeamsPage.jsx');
var UserList = require('./UserList.jsx');

var Routes = (
  <Route name="Home" path="/" handler={App}>
    <Router.DefaultRoute handler={Home} />
    <Route name="Teams" path="teams">
      <Route name="Team" path=":teamName" handler={TeamPage} />
      <Router.DefaultRoute handler={TeamsPage} />
    </Route>
    <Route name="Users" path="users" handler={UserList} />
    <Route name="Resources" path="resources" handler={TeamsPage} />
  </Route>
);

module.exports = Routes;
