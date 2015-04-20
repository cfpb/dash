// var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');
var React = require('react');
var Home = require('./Home.jsx');
var _ = require('lodash');
var Router = require('react-router');
var stores = require('../stores');

var App = React.createClass({
  stores: stores,
  getAppState: function() {
    return {
      teams: this.stores.teamStore.getState(),
      users: this.stores.userStore.getState(),
      loggedInUser: this.stores.loggedInStore.getState()
    };
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
    _.each(this.stores, function( store ) {
      store.off(null, null, that)
    })
  },
  _onChange: function() {
    this.setState(this.getAppState())
  },

  render: function() {
    var Body = <div></div>;

    if (this.isReady()) {
      Body = <div>
        <Router.RouteHandler {...this.state} />
      </div>;
    } else if (this.state.loggedInUser.isLoggedIn()) {
      Body = <div>Loading...</div>;
    }

    return (
      <div>
        <Header loggedInUser={this.state.loggedInUser} />
        <main className="content" id="main" role="main">
          <div className="content_bar"></div>
          <div className="content_wrapper">
            <div className="content_main">
              {Body}
            </div>
          </div>
        </main>
      </div>
    );
  }

});

module.exports = App;
