var React = require('react');
var _ = require('lodash');
var UserList = require('./UserList.jsx');

var TeamPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    teams: React.PropTypes.object.isRequired
  },
  render: function() {

    var teamId = this.context.router.getCurrentParams().teamId;
    var team = this.props.teams.get('team_' + teamId);
    if (!team) {
      return (<div />);
    }
    teamName = team.get('name');

    var members = team.getMembersSortedByRole()

    var Members = _.map(members, function(users, role) {
      return (
        <div>
          <h3>{role}</h3>
          <UserList users={users} />
          </div>
      )
    });

    return (
      <div>
        <h1>{teamName}</h1>
        <h2>Members</h2>
        {Members}
      </div> 
    )

  }

});

module.exports = TeamPage;
