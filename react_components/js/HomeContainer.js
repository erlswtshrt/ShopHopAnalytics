var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var ActionsBar = require('./HomeActionsBar');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var History = require('react-router').History;

var ref = new Firebase("https://shophopusers.firebaseio.com/");
var authData = null;

var uid = null;

var HomeContainer = React.createClass({displayName: "HomeContainer",
  componentDidMount: function() {
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;
  },
  getInitialState: function() {
    return { productId: null }
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "flex-col homeHeader-bg"}, 
          React.createElement("div", {className: "flex-row  mt1 ml3"}, 
            React.createElement("img", {src: "www/assets/logo.svg", height: "24", width: "24"}), 
            React.createElement("div", {className: "textWhite text1-5 ml0-5"}, "analytics")
          ), 
          React.createElement("div", {className: "h15"}), 
          React.createElement("div", {className: "flex-row c mt2"}, 
            React.createElement(Link, {to: "/newproduct"}, 
            React.createElement("div", {className: "c bRightWhite p"}, 
              React.createElement("div", {className: "opacityTile pr5 pl5"}, 
                React.createElement("img", {src: "www/assets/user.svg", height: "22", width: "22"}), 
                React.createElement("div", {className: "textWhite text0-9 mt0-5"}, "profile")
              )
            )
            ), 
            React.createElement(Link, {to: "/analytics"}, 
              React.createElement("div", {className: "c bRightWhite p"}, 
                React.createElement("div", {className: "opacityTile pr5 pl5"}, 
                  React.createElement("img", {src: "www/assets/analytics.svg", height: "22", width: "22"}), 
                  React.createElement("div", {className: "textWhite text0-9 mt0-5"}, "analytics")
                )
              )
            ), 
            React.createElement(Link, {to: "/profile"}, 
              React.createElement("div", {className: "c p"}, 
                React.createElement("div", {className: "opacityTile pr5 pl5"}, 
                  React.createElement("img", {src: "www/assets/add.svg", height: "22", width: "22"}), 
                  React.createElement("div", {className: "textWhite text0-9 mt0-5"}, "new product")
                )
              )
            )
          )
        )
      )
    );
  }
});

module.exports = HomeContainer;