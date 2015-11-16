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

var AnalyticsContainer = React.createClass({
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
      return <div className="mt0-5">{product.name}</div>
    });
    return (
      <div className="flex-col">
        <Header className="flex-row" />
        <div className="flex-row c mt3">
          <PieChart data={this.state.views} />
          <div className="flex-col ml3">
            {rows}
          </div>
        </div>
        <div className="flex-row mt3">  
        </div>
      </div>
    );
  }
});

module.exports = AnalyticsContainer;

var Chart = React.createClass({
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
});

var Sector = React.createClass({
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
      <g className="arc" style={style}>
        <path d={arc(this.props.data)}></path>
      </g>
    );
  }
});

var DataSeries = React.createClass({
  render: function() {

    var pie = d3.layout.pie()
    var bars = _.map(pie(this.props.data), function(point, i) {
      return (
        <Sector data={point} key={i} order={i}/>
      )
    });

    return (
      <g transform="translate(100, 100)">{bars}</g>
    );
  }
});

var PieChart = React.createClass({
  getDefaultProps: function() {
    return {
      width: 200,
      height: 200
    };
  },
  render: function() {
    console.log(this.props.data);
    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries data={this.props.data} width={this.props.width} height={this.props.height}  />
      </Chart>
    );
  }
});