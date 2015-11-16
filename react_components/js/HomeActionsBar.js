var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var ref = new Firebase("https://shophopusers.firebaseio.com/");
var authData = null;

var uid = null;

var HomeActionsBar = React.createClass({displayName: "HomeActionsBar",
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
        React.createElement("div", {className: "bgNavy h10"})
      )
    );
  }
});

module.exports = HomeActionsBar;