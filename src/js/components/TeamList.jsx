var React = require('react');
var $ = require('jquery');
var TeamItem = require('./TeamItem.jsx');
var TeamStore = require('../stores/TeamStore');

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
        currentUserId = this.props.currentUserId,
        roles = {};

    teams = teams.map(function(team) {
      var userMembers = users.filter(function(user, i) {
        return $.inArray(user.name, team.roles.member.members) > -1;
      });
      var adminMembers = users.filter(function(user, i) {
        return $.inArray(user.name, team.roles.admin.members) > -1;
      });
      var assets = TeamStore.getTeamAssets(team);

      function addTeams(members) {
        return members.map(function(member) {
          member.team = {};
          member.team._id = team._id;
          member.team.name = team.name;
          return member;
        });
      }

      userMembers = addTeams(userMembers);
      adminMembers = addTeams(adminMembers);

      if (currentUserId && $.inArray(currentUserId, team.roles.member.members) > -1) {
        roles.member = true;
      }

      if (currentUserId && $.inArray(currentUserId, team.roles.admin.members) > -1) {
        roles.admin = true;
      }

      return <TeamItem name={team.name} memberUsers={userMembers} adminUsers={adminMembers} roles={roles} assets={assets} key={team.name} />;
    });

    return (
      <div className="teams">
        {teams}
      </div>
    )

  }

});

module.exports = TeamList;
