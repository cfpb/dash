var React = require('react');

var Button = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ])
  },
  getDefaultProps: function() {
    return {
      label: 'Click here!',
      type: ''
    };
  },
  render: function() {
    var types = this.props.type instanceof Array ? this.props.type.join(' ') : this.props.type;
    types = 'btn ' + types;
    return (
      <button className={types}>
        {this.props.label}
      </button>
    );
  }
});

module.exports = Button;
