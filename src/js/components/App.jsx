/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

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

/**
 * Retrieve the current TODO data from the TodoStore
 */
 function getAllTeams() {
   return  TeamStore.getAll();
 }

var App = React.createClass({

  getInitialState: function() {
    // return getTodoState();
    return {
      teams: []
    }
  },

  componentDidMount: function() {
    //TeamStore.addChangeListener(this._onChange);
    var getTeams = getAllTeams();
    var getUsers = common.getAllUsers();
    var p = $.when( getTeams, getUsers );
    p.then(function( teams, users ) {
      this.setState({
        teams: teams[0],
        users: users[0]
      });
    }.bind( this ));
  },

  // componentWillUnmount: function() {
  //   TodoStore.removeChangeListener(this._onChange);
  // },

  /**
   * @return {object}
   */
  render: function() {
    // console.log(JSON.stringify(this.state.teams));
    return (
      <div>
        <h1>Teams</h1>
        <TeamList teams={this.state.teams} users={this.state.users} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  // _onChange: function() {
  //   this.setState(getTodoState());
  // }

});

module.exports = App;