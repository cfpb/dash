var React = require('react');

var Icon = React.createClass({
  propTypes: {
    type: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ])
  },
  getDefaultProps: function() {
    return {
      type: 'error'
    };
  },
  render: function() {
    var types = this.props.type instanceof Array
              ? 'cf-icon cf-icon-' + this.props.type.join(' cf-icon-')
              : 'cf-icon cf-icon-' + this.props.type;
    types = this.props.disabled ? types + ' disabled' : types;
    return (
      <span onClick={this.props.onClick} className={types}></span>
    );
  }
});

module.exports = Icon;
