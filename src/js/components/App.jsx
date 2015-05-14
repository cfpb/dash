// var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');
var React = require('react');
var Home = require('./Home.jsx');
var Crumbs = require('./Crumbs.jsx');
var _ = require('lodash');
var Router = require('react-router');
var teamStore = require('../stores/teamStore');
var teamDetailStore = require('../stores/teamDetailStore');
var userStore = require('../stores/userStore');
var loggedInUserStore = require('../stores/loggedInUserStore');

var App = React.createClass({
  stores: {
    teamStore: teamStore,
    users: userStore,
    loggedInUser: loggedInUserStore,
    teamDetails: teamDetailStore
  },
  getAppState: function() {
    var state = {};
    _.each(this.stores, function( store, storeName ) {
      state[storeName] = store.getState()
    });
    return state;
  },
  getInitialState: function() {
    return this.getAppState();
  },
  isReady: function() {
    return this.state.users.length &&
      this.state.loggedInUser.get('name') &&
      true;
  },
  componentDidMount: function() {
    var that = this;
    _.each(this.stores, function( store ) {
      store.onChange(that._onChange, that);
    })
  },
  componentWillUnmount: function() {
    var that = this;
    _.each(this.stores, function(store) {
      store.off(null, null, that)
    })
  },
  _onChange: function() {
    this.setState(this.getAppState())
  },
  render: function() {
    var Body = <div></div>;

    if (this.isReady()) {
      Body = (
        <div>
          <Router.RouteHandler {...this.state} />
        </div>
      );
    } else if (this.state.loggedInUser.isLoggedIn()) {
      Body = <div>Loading...</div>;
    }

    return (
      <div className="app">
        <Header loggedInUser={this.state.loggedInUser} />
        <main className="content" id="main" role="main">
          <div className="content_bar"></div>
          <div className="content_wrapper">
            <div className="content_main">
              <Crumbs />
              {Body}
            </div>
          </div>
        </main>
      </div>
    );
  }

});

module.exports = App;
