var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./App.jsx')
var Home = require('./Home.jsx');
var TeamPage = require('./TeamPage.jsx');
var TeamsPage = require('./TeamsPage.jsx');
var UserList = require('./UserList.jsx');
  
var PassThrough = React.createClass({
  render: function() {
    return <Router.RouteHandler {...this.props} />;
  }
});
var Routes = (
  <Route name="app" path="/static/" handler={App}>
    <Router.DefaultRoute handler={Home} />
    <Route name="teams" handler={PassThrough}>
      <Route name="team" path=":teamId" handler={TeamPage} />
      <Router.DefaultRoute handler={TeamsPage} />
    </Route>
    <Route name="users" handler={UserList} />
    <Route name="resources" handler={TeamsPage} />
  </Route>
);

module.exports = Routes;

// var pages = {
    //   '': {
    //     comp: <Home />
    //     children: {
    //       teams: {
    //         comp: <TeamList teams={this.state.teams} />
    //       }
    //     }
    //   }