/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

// var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');
// var TeamList = require('./TeamList.jsx');
var React = require('react');
// var common = require('../utils/common');
var $ = require('jquery');
var TeamStore = require('../stores/TeamStore');
var UserStore = require('../stores/UserStore');
var LoggedInStore = require('../stores/LoggedInStore');
var Backbone = require('backbone');

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
  getAppState: function() {
    return {
      teams: TeamStore.models,
      users: UserStore.models,
      loggedInUser: LoggedInStore
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
    TeamStore.on('all', this._onChange)
    UserStore.on('change', this._onChange)
    LoggedInStore.on('change', this._onChange)

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
    TeamStore.off('change', this._onChange);
    UserStore.off('change', this._onChange);
    LoggedInStore.off('change', this._onChange);
  },

  _onChange: function() {
    console.log('change happened!')
    this.setState(this.getAppState())
  },

  render: function() {
    var Body;

    if (this.isReady()) {
      Body = <h1>hello: {this.state.teams.length} teams, {this.state.users.length} users.</h1>;
    } else {
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
