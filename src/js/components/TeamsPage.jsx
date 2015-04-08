var React = require('react');
var $ = require('jquery');
var TeamStore = require('../stores/TeamStore');
var TeamListItem = require('./TeamListItem.jsx')

var TeamsPage = React.createClass({

  propTypes: {
    teams: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    loggedInUser: React.PropTypes.object.isRequired
  },

  render: function() {

    var teams = this.props.teams;

    teams = teams.models.map(function(team) {
      return <TeamListItem team={team} key={team.get('name')} />;
    });

    return (
      <ul className="teams">
        {teams}
      </ul>
    )

  }

});

module.exports = TeamsPage;
