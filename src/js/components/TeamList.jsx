var React = require('react');
var $ = require('jquery');
var TeamItem = require('./TeamItem.jsx');

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
        users = this.props.users;

    teams = teams.map(function(team) {
      var members = users.filter(function(val, i) {
        return $.inArray(val.name, team.roles.member.members) > -1;
      });
      members = members.map(function(member) {
        member.team = {};
        member.team._id = team._id;
        member.team.name = team.name;
        return member;
      });
      return <TeamItem name={team.name} users={members} key={team.name} />;
    });

    return (
      <div className="team-list">
        {teams}
      </div>
    )

  }

});

module.exports = TeamList;
