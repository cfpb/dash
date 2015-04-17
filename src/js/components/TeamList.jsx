var React = require('react');
var $ = require('jquery');
var TeamItem = require('./TeamItem.jsx');
//var TeamStore = require('../stores/TeamStore');
var App =require('App');
var TeamList = React.createClass({

  propTypes: {
    teams: React.PropTypes.array.isRequired,
    users: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      teams: [],
      users: []
    };
  },

  render: function() {

    var teams = this.props.teams,
      users = this.props.users,
      currentUserId = this.props.currentUserId;

    teams = teams.map(function(team) {

      var constructedTeam = App.stores.TeamStore.constructTeamAndUserMetadata(team, users, currentUserId);
      constructedTeam.assets = TeamStore.getTeamAssets(team);

      return <TeamItem name={constructedTeam.name} memberUsers={constructedTeam.userMembers} adminUsers={constructedTeam.adminMembers} roles={constructedTeam.roles} assets={constructedTeam.assets} key={constructedTeam.name} />;
    });

    return (
      <div className="teams">
        {teams}
      </div>
    )

  }

});

module.exports = TeamList;
