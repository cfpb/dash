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

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getAllTeams() {
  return TeamStore.getAll();
}

function getAllUsers(){
  return UserStore.getAll();
}

var App = React.createClass({

  getInitialState: function() {
    // return getTodoState();
    return {
      teams: [],
      users: []
    }
  },

  componentDidMount: function() {
    //TeamStore.addChangeListener(this._onChange);
    var getTeams = getAllTeams();
    var getUsers = getAllUsers();
    var p = $.when(getTeams, getUsers);
    p.then(function(teams, users) {
      this.setState({
        teams: teams[0],
        users: users[0]
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <h1>Teams</h1>
        <TeamList teams={this.state.teams} users={this.state.users} />
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
