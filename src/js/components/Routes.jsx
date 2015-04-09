var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./App.jsx')
var Home = require('./Home.jsx');
var TeamPage = require('./TeamPage.jsx');
var TeamsPage = require('./TeamsPage.jsx');
var UserList = require('./UserList.jsx');

var Routes = (
  <Route name="app" path="/" handler={App}>
    <Router.DefaultRoute handler={Home} />
    <Route name="teams">
      <Route name="team" path=":teamName" handler={TeamPage} />
      <Router.DefaultRoute handler={TeamsPage} />
    </Route>
    <Route name="users" handler={UserList} />
    <Route name="resources" handler={TeamsPage} />
  </Route>
);

module.exports = Routes;
