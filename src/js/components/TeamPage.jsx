var React = require('react');
var _ = require('lodash');
var UserList = require('./UserList.jsx');
var Icon = require('./Icon.jsx');
var AddUser = require('./AddUser.jsx');

var TeamPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    teams: React.PropTypes.object.isRequired
  },
  render: function() {

    var teamName = this.context.router.getCurrentParams().teamName;
    var team = this.props.teams.get(teamName);
    if (!team) {
      return (<div />);
    }
    var allMembers = team.getMembersSortedByRole();

    var Members = _.map(allMembers, function(members, role) {
      var nonMembers = team.getNonMembersByRole(role) || [];
      var canAdd = team.get('roles')[role].perms.add;
      var canRemove = team.get('roles')[role].perms.remove;
      var addUser = (canAdd) ? <AddUser users={nonMembers} teamName={teamName} role={role} /> : ''
      return (
        <div>
          <h3>{role}</h3>
          {addUser}
          <UserList users={members} canRemove={canRemove} teamName={teamName} role={role} />
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
