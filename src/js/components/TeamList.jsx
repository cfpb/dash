var React = require('react');
var TeamListItem = require('./TeamListItem.jsx');
var AddTeam = require('./AddTeam.jsx');

var TeamList = React.createClass({

  propTypes: {
    teams: React.PropTypes.array.isRequired
  },

  render: function(){
    var teams = this.props.teams;
    var canRemove = this.props.canRemove;
    if (teams.length > 0) {
      teams = teams.map(function(team){
        return <TeamListItem team={team} canRemove={canRemove} key={team.get('name')}/>;
      })
    }

    else {
      teams = <li className="list-item teams-list-item"><em>no teams found</em></li>;
    }

    return (
      <ul className="teams-list">
        {teams}
      </ul>
    )
  }

});

module.exports = TeamList;
