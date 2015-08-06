var React = require('react');
var _ = require('lodash');
var capitalize = require('capitalize');
var MemberList = require('./MemberList.jsx');
var Icon = require('./Icon.jsx');
var Button = require('./Button.jsx');
var AddMember = require('./AddMember.jsx');
var AddAsset = require('./AddAsset.jsx');
var AssetList = require('./AssetList.jsx');
var resources = require('../utils/resources');
var TeamDetailActions = require('../actions/TeamDetailActions');

var TeamPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    teamStore: React.PropTypes.object.isRequired
  },

  handleRefresh: function(){
    var teamName = this.context.router.getCurrentParams().teamName;
    this.setState({refreshInProgress: true})
    TeamDetailActions.refreshDetails({teamName: teamName, force: true});
  },
  componentDidUpdate: function(){
    var teamName = this.context.router.getCurrentParams().teamName
    TeamDetailActions.refreshDetails({teamName: teamName});
  },
  render: function(){
    var teamName = this.context.router.getCurrentParams().teamName
    var team = this.props.teamStore.get(teamName);
    var teamDetails = this.props.teamDetails.get(teamName); // this might be undefined
    if (!team) {
      return (<div />);
    }
    var allMembers = team.getMembersSortedByRole();

    var isInProgress = false;
    if (teamDetails) {
      isInProgress = teamDetails.fetchInProgress;
    }
    var Members = _.map(allMembers, function(members, roleName){
      var nonMembers = team.getNonMembersByRole(roleName) || [];
      var canAdd = team.get('roles')[roleName].perms.add;
      var canRemove = team.get('roles')[roleName].perms.remove;
      var addMember = (canAdd) ? <AddMember users={nonMembers} teamName={teamName} roleName={roleName}/> : '';
      return (
        <div>
          <div className="team-page-header">
            <h3 className="inline">{capitalize(roleName)}</h3>
            <span>{addMember}</span>
          </div>
          <MemberList users={members} canRemove={canRemove} teamName={teamName} roleName={roleName}/>
        </div>
      );
    });

    var allAssets = team.get('rsrcs');
    var allAssetDetails = (teamDetails) ? teamDetails.get('rsrcs') : {};
    if (!allAssetDetails) {
      allAssetDetails = {};
    }
    var Assets = _.map(allAssets, function(resource, resourceName){
      var assetDetails = allAssetDetails[resourceName] || [];
      var canAdd = resource.perms.add;
      var canRemove = resource.perms.remove;
      var addAsset = (canAdd) ? <AddAsset teamName={teamName} resourceName={resourceName}
                                          isAddingAsset={team.isAddingAsset[resourceName]}/> : '';
      var assets = resource.assets || [];
      return (
        <div>
          <div className="team-page-header">
            <h3 className="inline">{resources.teamResources[resourceName].assetTitle}</h3>
            <span>{addAsset}</span>
          </div>
          <AssetList canRemove={canRemove} teamName={teamName} resourceName={resourceName} assets={assets}
                     assetDetails={assetDetails}/>
        </div>
      )
    })
    return (
      <div>{isInProgress}
        <h1>{teamName}
          {isInProgress}
          <Button type={ isInProgress ? 'disabled' : 'default'} label="Refresh"
                  onClick={this.handleRefresh} className="action-btn"/></h1>

        <h2>Team Members</h2>
        {Members}
        <h2>Assets</h2>
        {Assets}
      </div>
    )

  }

});

module.exports = TeamPage;
