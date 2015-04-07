var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./App.jsx')
var Home = require('./Home.jsx');
var TeamList = require('./TeamList.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
  </Route>
);

module.exports = {data: routes};

// Router.run(Routes, function (Handler) {
//   React.render(<Handler/>, document.getElementById('app'));
// });

// var pages = {
    //   '': {
    //     comp: <Home />
    //     children: {
    //       teams: {
    //         comp: <TeamList teams={this.state.teams} />
    //       }
    //     }
    //   }