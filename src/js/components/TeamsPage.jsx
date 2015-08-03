var React = require('react');
var TeamList = require('./TeamList.jsx');
var AddTeam = require('./AddTeam.jsx');
var _ = require('lodash');

var TeamsPage = React.createClass({

  propTypes: {
    teamStore: React.PropTypes.object.isRequired,
    loggedInUser: React.PropTypes.object.isRequired
  },

  render: function() {

    var canAdd = this.props.loggedInUser.get('perms').team.add;
    var canRemove = this.props.loggedInUser.get('perms').team.remove;

    var addTeam = (canAdd) ? <AddTeam /> : '';
    var teams = this.props.teamStore;

    var myTeams = teams.myTeams();
    var otherTeams = _.without(teams.models, myTeams)


    return (
      <section className="teams-page">
        <div className="teams-page-header">
          <h2 className="inline"> MyTeams</h2>
          <span>{addTeam}</span>
        </div>
        <ul className="teams-page">
          <TeamList teams={myTeams} canRemove={false} />
        </ul>


        <div className="teams-page-header">
          <h2 className="inline">Other Teams</h2>
          <span>{addTeam}</span>
        </div>
        <ul className="teams-page">
          <TeamList teams={otherTeams} canRemove={canRemove} />
        </ul>


      </section>
    )
  }
});

module.exports = TeamsPage;
