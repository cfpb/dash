var React = require('react');

var TeamList = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    teams: React.PropTypes.array.isRequired
  },
  
  render: function() {

    var teamId = this.context.router.getCurrentParams().teamId;
    var team = this.props.teams.get('team_' + teamId);

    return (
      <h1>{team.get('name')}</h1>
    )

  }

});

module.exports = TeamList;
