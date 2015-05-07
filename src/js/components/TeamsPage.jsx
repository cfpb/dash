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

    teams = teams.models.map(function(team) {
      return <TeamListItem team={team} canRemove={canRemove} key={team.get('name')} />;
    });

    return (
      <section>
        <div className="teams-page-header">
          <h2 className="inline">Teams</h2>
          <span>{addTeam}</span>
        </div>
        <ul className="teams-page">
          {teams}
        </ul>
      </section>
    )
  }
});

module.exports = TeamsPage;
