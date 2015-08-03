var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Crumbs = React.createClass({
  mixins: [Router.State],
  render: function() {
    var crumbs = [];
    var routes = this.getRoutes().filter(function(route) {
      return !route.isDefault;
    });
    var currentPage = routes[routes.length - 1];
    routes.forEach(function(route, i, arr) {
      var link;
      if (i != arr.length - 1) {
        crumbs.push(
          <li className="breadcrumbs_item" key={route.name + '' + crumbs.length}>
            <Link to={route.path} className="breadcrumbs_link">{route.name}</Link>
          </li>
        );
      }
    });
    crumbs.push(
      <li className="breadcrumbs_item" key={currentPage.name + '' + crumbs.length}>
        {this.getParams().teamName || currentPage.name}
      </li>
    )
    return <ul className="breadcrumbs">{crumbs}</ul>;
  }
});

module.exports = Crumbs;
