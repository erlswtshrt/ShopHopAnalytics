var React = require('react/addons');
var NewProductContainer = require('./NewProductContainer');

var DashboardContainer = React.createClass({
	updateDashState: function(__state) {
		this.setState({ appState: __state });
	},
	getInitialState: function() {
		return {	user: null,
					dashState: 'newProduct'	};
	},
	componentDidMount: function() {
		if(this.props.user === null) this.props.updateAppState('login');
	},
	render: function() {
		switch(this.state.dashState) {
		    case 'newProduct':
		        return <NewProductContainer user={this.props.user} uid={this.props.uid} />
		        break;
		    default:
		        return <div>rendering error</div>
		}
	}
});

module.exports = DashboardContainer;