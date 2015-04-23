var React = require('react');
var _ = require('lodash');
var MemberList = require('./MemberList.jsx');
var Icon = require('./Icon.jsx');
var AddMember = require('./AddMember.jsx');
var AddAsset = require('./AddAsset.jsx');
var AssetList = require('./AssetList.jsx');

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

    var Members = _.map(allMembers, function(members, roleName) {
      var nonMembers = team.getNonMembersByRole(roleName) || [];
      var canAdd = team.get('roles')[roleName].perms.add;
      var canRemove = team.get('roles')[roleName].perms.remove;
      var addMember = (canAdd) ? <AddMember users={nonMembers} teamName={teamName} roleName={roleName} /> : '';
      return (
        <div>
          <h3>{roleName}</h3>
          {addMember}
          <MemberList users={members} canRemove={canRemove} teamName={teamName} roleName={roleName} />
        </div>
      )
    });

    var allAssets = team.get('rsrcs')

    var Assets = _.map(allAssets, function(resource, resourceName) {
      var canAdd = resource.perms.add;
      var canRemove = resource.perms.remove;
      var addAsset = (canAdd) ? <AddAsset teamName={teamName} resourceName={resourceName} /> : '';
      var assets = resource.assets || [];
      return (
        <div>
          <h3>{resourceName}</h3>
          {addAsset}
          <AssetList canRemove={canRemove} teamName={teamName} resourceName={resourceName} assets={assets} />
        </div>
      )
    })
    return (
      <div>
        <h1>{teamName}</h1>
        <h2>Members</h2>
        {Members}
        <h2>Assets</h2>
        {Assets}
      </div>
    )

  }

});

module.exports = TeamPage;
