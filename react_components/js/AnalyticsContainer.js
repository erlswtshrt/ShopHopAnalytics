var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var _ = require('underscore');
var d3 = require('d3');

var ActionsBar = require('./HomeActionsBar');
var Tile = require('./AnalyticsProductTile');
var Header = require('./Header');

var ref = new Firebase("https://shophopusers.firebaseio.com/");
var authData = null;

var uid = null;

var AnalyticsContainer = React.createClass({displayName: "AnalyticsContainer",
  componentDidMount: function() {
    this.setState({loading: true});
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;

    var self = this;

    var products = [];
    var views = [];

    var productsRef = ref.child("webusers").child(uid).child("products");
    productsRef.once("value", function(pids) {
      for (var pid in pids.val()) {
        if (pids.val().hasOwnProperty(pid)) {
          var productRef = ref.child("products").child(pid);
          productRef.once("value", function(snapshot) {
            products.push(snapshot.val());
            console.log(snapshot.child("views").val());
            views.push(snapshot.child("views").val());

            self.setState({ products: products,
              views: views });
          });
        }
      }
      this.setState({loading: false});
    });
  },
  getInitialState: function() {
    return {  products: [],
              views: [],
              loading: false }
  },
  render: function() {
    var rows = this.state.products.map(function(product) {
      return React.createElement("div", {className: "mt0-5"}, product.name)
    });
    return (
      React.createElement("div", {className: "flex-col"}, 
        React.createElement(Header, {className: "flex-row"}), 
        React.createElement("div", {className: "flex-row c mt3"}, 
          React.createElement(PieChart, {data: this.state.views}), 
          React.createElement("div", {className: "flex-col ml3"}, 
            rows
          )
        ), 
        React.createElement("div", {className: "flex-row mt3"}
        )
      )
    );
  }
});

module.exports = AnalyticsContainer;

var Chart = React.createClass({displayName: "Chart",
  render: function() {
    return (
      React.createElement("svg", {width: this.props.width, height: this.props.height}, this.props.children)
    );
  }
});

var Sector = React.createClass({displayName: "Sector",
  render: function() {
    var colors = ['#ef6c6c', '#916fb5', '#42c697', '#f4b571', '#d6639d', '#f7db63', '#6accc0', '#4b74b5', '#4bc8dd'];
    var color = colors[this.props.order];
    var style = {
      fill: color
    }
    var arc = d3.svg.arc()
        .outerRadius(100)
        .innerRadius(80);
    return (
      React.createElement("g", {className: "arc", style: style}, 
        React.createElement("path", {d: arc(this.props.data)})
      )
    );
  }
});

var DataSeries = React.createClass({displayName: "DataSeries",
  render: function() {

    var pie = d3.layout.pie()
    var bars = _.map(pie(this.props.data), function(point, i) {
      return (
        React.createElement(Sector, {data: point, key: i, order: i})
      )
    });

    return (
      React.createElement("g", {transform: "translate(100, 100)"}, bars)
    );
  }
});

var PieChart = React.createClass({displayName: "PieChart",
  getDefaultProps: function() {
    return {
      width: 200,
      height: 200
    };
  },
  render: function() {
    console.log(this.props.data);
    return (
      React.createElement(Chart, {width: this.props.width, height: this.props.height}, 
        React.createElement(DataSeries, {data: this.props.data, width: this.props.width, height: this.props.height})
      )
    );
  }
});