var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var QRCode = require('qrcode.react');

var ref = new Firebase("https://shophopusers.firebaseio.com/");
var authData = null;

var uid = null;

var NewProductContainer = React.createClass({
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

    var timeStamp = new Date().getTime().toString();

    ref.child("webusers").child(uid).child("products").child(id).set({
      time: timeStamp,
    });

    var productsRef = ref.child("products");
    productsRef.child(id).set({ 
      name: name,
      brand: brand,
      store: store,
      description: description,
      category: category,
      views: 0
    });
  },
  render: function() {
    var qrCode = this.state.productId === null ? null : <QRCode className="mb2" value={this.state.productId} />
    return (
      <div className="flex-col c full-bg h-full">
        {qrCode}
        <div className="textWhite text1-2 mt2">Add a new product.</div>
        <form className="flex-col mt2 c">
          <input className="textInputLarge" type="text" name="name" placeholder="Product Name" ref="name" />
          <input className="textInputLarge" type="text" name="brand" placeholder="Brand or Designer" ref="brand" />
          <input className="textInputLarge" type="text" name="store" placeholder="Store" ref="store" />
          <input className="textInputLarge" type="textarea" name="description" placeholder="Description" ref="description" />
          <input className="textInputLarge" type="text" name="category" placeholder="Category" ref="category" />
        </form>
        <div className="buttonLarge bgGreen textWhite" onClick={this.addProduct}>Add Product</div>
      </div>
    );
  }
});

module.exports = NewProductContainer;