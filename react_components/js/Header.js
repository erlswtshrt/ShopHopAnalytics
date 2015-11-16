var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var ActionsBar = require('./HomeActionsBar');

var ref = new Firebase("https://shophopusers.firebaseio.com/");
var authData = null;

var uid = null;

var Header = React.createClass({displayName: "Header",
  componentDidMount: function() {
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;
  },
  getInitialState: function() {
    return { productId: null }
  },
  render: function() {
    return (
          React.createElement("div", {className: "bgBlue p0-5"}, 
            React.createElement("span", null, React.createElement("img", {src: "www/assets/logo.svg", width: "24"})), 
            React.createElement("span", {className: "textWhite text1-2 ml0-5"}, "analytics"), 
            React.createElement("span", {className: "right"}, 
              React.createElement("img", {src: "www/assets/home.svg", className: "p opacityTile c", height: "22", width: "22"}), 
              React.createElement("img", {src: "www/assets/user.svg", className: "ml1 p opacityTile c", height: "22", width: "22"}), 
              React.createElement("img", {src: "www/assets/analytics.svg", className: "ml1 p opacityTile c", height: "22", width: "22"}), 
              React.createElement("img", {src: "www/assets/add.svg", className: "ml1 p opacityTile c", height: "22", width: "22"})
            )
          )
    );
  }
});

module.exports = Header;