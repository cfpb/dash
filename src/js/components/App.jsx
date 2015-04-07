/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

// var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');
// var TeamList = require('./TeamList.jsx');
var React = require('react');
var Home = require('./Home.jsx');
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('react-router');

// function getAllTeams() {
//   return TeamStore.getAll();
// }

// function getAllUsers() {
//   return UserStore.getAll();
// }

// function getCurrentUser() {
//   return UserStore.getCurrentUser();
// }

// function filterTeams(teams, currentUser){
//   return TeamStore.getFilteredTeams(teams, currentUser);
// }

var App = React.createClass({
  stores: {
    teamStore: require('../stores/TeamStore'),
    userStore: require('../stores/UserStore'),
    loggedInStore: require('../stores/LoggedInStore'),
    routeStore: require('../stores/RouteStore')
  },
  getAppState: function() {
    return {
      teams: this.stores.teamStore.getState(),
      users: this.stores.userStore.getState(),
      loggedInUser: this.stores.loggedInStore.getState(),
      route: this.stores.routeStore.getState()
    };
  },
  getInitialState: function() {
    return this.getAppState();
  },
  isReady: function() {
    return this.state.users.length &&
           this.state.loggedInUser.get('name') &&
           true
  },
  // oldGetInitialState: function() {
  //   return {
  //     allUsers: [],
  //     allTeams: [],
  //     user: {
  //       loggedIn: false,
  //       id: null,
  //       username: 'Anonymous',
  //       teams: [],
  //       roles: []
  //     }
  //   }
  // },
  componentDidMount: function() {
    var that = this;
    _.each(this.stores, function(store) {
      store.onChange(that._onChange, that);
    })
    //TeamStore.addChangeListener(this._onChange);
    // var getItAll = $.when(getAllTeams(), getAllUsers(), getCurrentUser());
    // getItAll.then(function(teams, users, currentUser) {
    //   var filteredTeams = filterTeams(teams[0], currentUser[0]);
    //   this.setState({
    //     allUsers: users[0],
    //     allTeams: teams[0],
    //     otherTeams: filteredTeams.otherTeams,
    //     user: {
    //       loggedIn: true,
    //       id: currentUser[0].name,
    //       username: currentUser[0].data.username,
    //       teams: filteredTeams.myTeams,
    //       roles: currentUser[0].roles
    //     }
    //   });
    // }.bind(this));

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

  getBody: function() {
    var route = this.state.route;

    // var pages = {
    //   '': {
    //     comp: <Home />
    //     children: {
    //       teams: {
    //         comp: <TeamList teams={this.state.teams} />
    //       }
    //     }
    //   }
    // }
  },
  render: function() {
    // var Body = <div></div>;

    // if (this.isReady()) {
    //   Body = <div>
        
    //   </div>;
    // } else if (this.state.loggedInUser.isLoggedIn()) {
    //   Body = <div>Loading...</div>;
    // }
    
    return (
      <div>
        <Header loggedInUser={this.state.loggedInUser} />
        <main className="content" id="main" role="main">
          <div className="content_bar"></div>
          <div className="content_wrapper">
            <div className="content_main">
              <Router.RouteHandler/>
            </div>
          </div>
        </main>
      </div>
    );

    // var s = this.state;
    // var teams = s.user.loggedIn ? (
    //   <div id='my-teams'>
    //     <h1>My Teams</h1>
    //     <TeamList teams={s.user.teams} users={s.allUsers} currentUserId={s.user.id} />
    //     <h1>All Other Teams</h1>
    //     <TeamList teams={s.otherTeams} users={s.allUsers} />
    //   </div>
    // ) : null;
    // return (
    //   <div>
        // <Header loggedIn={s.user.loggedIn} username={s.user.username} roles={s.user.roles} />
        // <main className="content" id="main" role="main">
        //   <div className="content_bar"></div>
        //   <div className="content_wrapper">
        //     <div className="content_main">
        //       {teams}
        //     </div>
        //   </div>
        // </main>
    //   </div>
    // );
  }

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  // _onChange: function() {
  //   this.setState(getTodoState());
  // }

});

module.exports = App;
