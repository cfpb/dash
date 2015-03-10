var React = require('react');

var Button = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
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
    var types = this.props.type instanceof Array
              ? 'btn btn__' + this.props.type.join(' btn__')
              : 'btn btn__' + this.props.type;
    return (
      <a href={this.props.href} className={types}>{this.props.label}</a>
    );
  }
});

module.exports = Button;
