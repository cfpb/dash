var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./components/App.jsx')
var Home = require('./components/Home.jsx');
var TeamList = require('./components/TeamList.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Router.DefaultRoute handler={Home}/>
    <Route name="teams" handler={TeamList}/>
  </Route>
);

Router.run(routes.data, function (Handler) {
  React.render(<Handler/>, document.body);
});