/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

// var Footer = require('./Footer.jsx');
// var Header = require('./Header.jsx');
var TeamList = require('./TeamList.jsx');
var React = require('react');
var common = require('../utils/common');
var $ = require('jquery');
var TeamStore = require('../stores/TeamStore');
var UserStore = require('../stores/UserStore');
var CurrentUserInfo = require('./CurrentUserInfo.jsx');


function getAllTeams() {
  return TeamStore.getAll();
}

function getAllUsers() {
  return UserStore.getAll();
}

function getCurrentUser() {
  return UserStore.getCurrentUser();
}

function filterTeams(teams, currentUser){
  return TeamStore.getFilteredTeams(teams, currentUser);
}

var App = React.createClass({

  getInitialState: function() {
    // return getTodoState();
    return {
      allUsers: [],
      allTeams: [],
      user: {
        loggedIn: false,
        id: null,
        username: 'Anonymous',
        teams: [],
        roles: []
      }
    }
  },

  componentDidMount: function() {

    //TeamStore.addChangeListener(this._onChange);
    var getItAll = $.when(getAllTeams(), getAllUsers(), getCurrentUser());
    getItAll.then(function(teams, users, currentUser) {
      var filteredTeams = filterTeams(teams[0], currentUser[0]);
      this.setState({
        allUsers: users[0],
        allTeams: teams[0],
        otherTeams: filteredTeams.otherTeams,
        user: {
          loggedIn: true,
          id: currentUser[0].name,
          username: currentUser[0].data.username,
          teams: filteredTeams.myTeams,
          roles: currentUser[0].roles
        }
      });
    }.bind(this));

  },

  render: function() {
    var s = this.state;
    var teams = s.user.loggedIn ? (
      <div className='team-list'>
        <h2>My Teams</h2>
        <TeamList teams={s.user.teams} users={s.allUsers} currentUserId={s.user.id} />
        <h2>All Other Teams</h2>
        <TeamList teams={s.otherTeams} users={s.allUsers} />
      </div>
    ) : null;
    return (
      <div>
        <h1>Dev Dash</h1>
        <CurrentUserInfo loggedIn={s.user.loggedIn} username={s.user.username} roles={s.user.roles} />
        {teams}
      </div>
    );
  }

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  // _onChange: function() {
  //   this.setState(getTodoState());
  // }

});

module.exports = App;
