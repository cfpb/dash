var React = require('react');

var TeamPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    teams: React.PropTypes.object.isRequired
  },
  render: function() {

    var teamId = this.context.router.getCurrentParams().teamId;
    var team = this.props.teams.length
             ? this.props.teams.get('team_' + teamId).get('name')
             : '';

    return (
      <h1>{team}</h1>
    )

  }

});

module.exports = TeamPage;
