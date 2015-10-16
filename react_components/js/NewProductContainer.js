var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var QRCode = require('qrcode.react');

var ref = new Firebase("https://shophopusers.firebaseio.com/");
var authData = null;

var uid = null;

var NewProductContainer = React.createClass({displayName: "NewProductContainer",
  componentDidMount: function() {
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;
  },
  getInitialState: function() {
    return { productId: null }
  },
  createProductId: function(__productName) {
    __productName = __productName.replace(/\s+/g, '');
    return uid.substring(0,5) + __productName;
  },
  addProduct: function() {
    var id = "0";
    var id = this.createProductId(React.findDOMNode(this.refs.name).value.trim());
    this.setState({ productId: id });

    var name = React.findDOMNode(this.refs.name).value.trim();
    var brand = React.findDOMNode(this.refs.brand).value.trim()
    var store = React.findDOMNode(this.refs.store).value.trim()
    var description = React.findDOMNode(this.refs.description).value.trim()
    var category = React.findDOMNode(this.refs.category).value.trim()

    var productsRef = ref.child("products");
    productsRef.child(id).set({ 
      name: name,
      brand: brand,
      store: store,
      description: description,
      category: category
    });
  },
  render: function() {
    var qrCode = this.state.productId === null ? null : React.createElement(QRCode, {value: this.state.productId})
    return (
      React.createElement("div", {className: "flex-col c full-bg h-full"}, 
        qrCode, 
        React.createElement("form", {className: "flex-col mt3"}, 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "name", placeholder: "Product Name", ref: "name"}), 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "brand", placeholder: "Brand or Designer", ref: "brand"}), 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "store", placeholder: "Store", ref: "store"}), 
          React.createElement("input", {className: "textInputLarge", type: "textarea", name: "description", placeholder: "Description", ref: "description"}), 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "category", placeholder: "Category", ref: "category"})
        ), 
        React.createElement("div", {className: "buttonLarge bgDarkBlue textWhite", onClick: this.addProduct}, "Add Product")
      )
    );
  }
});

module.exports = NewProductContainer;