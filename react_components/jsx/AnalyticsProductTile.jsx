var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var ActionsBar = require('./HomeActionsBar');

var ref = new Firebase("https://shophopusers.firebaseio.com/");
var authData = null;

var uid = null;

var AnalyticsProductTile = React.createClass({
  componentDidMount: function() {
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;
  },
  getInitialState: function() {
    return { productId: null }
  },
  render: function() {
    var tileBgStyle = {
      backgroundImage: 'linear-gradient(rgba(75, 116, 181, 0.8), rgba(75, 116, 181, 0.4)), url(./www/assets/storebg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: '0rem 0rem',
    }
    return (
      <div style={tileBgStyle} className="flex-col h10 flex-grow">
        <div className="textWhite ml1 mt1">Product1</div>
      </div>
    );
  }
});

module.exports = AnalyticsProductTile;