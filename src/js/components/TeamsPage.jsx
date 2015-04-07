var React = require('react');
var $ = require('jquery');
var TeamStore = require('../stores/TeamStore');
var TeamListItem = require('./TeamListItem.jsx')

var TeamList = React.createClass({

  propTypes: {
    teams: React.PropTypes.array.isRequired,
    users: React.PropTypes.array.isRequired,
    loggedInUser: React.PropTypes.object.isRequired
  },

  render: function() {

    var teams = this.props.teams;

    teams = teams.models.map(function(team) {
      return <TeamListItem team={team} key={team.name} />;
    });

    return (
      <ul className="teams">
        {teams}
      </ul>
    )

  }

});

module.exports = TeamList;
