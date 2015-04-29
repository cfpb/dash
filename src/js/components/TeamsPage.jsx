var React = require('react');
var TeamListItem = require('./TeamListItem.jsx');
var AddTeam = require('./AddTeam.jsx');

var TeamsPage = React.createClass({

  propTypes: {
    teams: React.PropTypes.object.isRequired,
    loggedInUser: React.PropTypes.object.isRequired
  },

  render: function() {

    var canAdd = this.props.loggedInUser.get('perms').team.add;
    var canRemove = this.props.loggedInUser.get('perms').team.remove;

    var addTeam = (canAdd) ? <AddTeam /> : '';
    var teams = this.props.teams;

    teams = teams.models.map(function( team ) {
      return <TeamListItem team={team} canRemove={canRemove} key={team.get('name')} />;
    });

    return (
      <div>
        <ul className="teams">
          {addTeam}
          {teams}
        </ul>
      </div>
    )
  }
});

module.exports = TeamsPage;
