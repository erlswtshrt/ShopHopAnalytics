var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var QRCode = require('qrcode.react');

var NewProductContainer = React.createClass({
  getInitialState: function() {
    return { productId: null }
  },
  createProductId: function(__productName) {
    __productName = __productName.replace(/\s+/g, '');
    return this.props.uid + __productName;
  },
  addProduct: function() {
    var id = "0";
    var id = this.createProductId(React.findDOMNode(this.refs.name).value.trim());
    this.setState({ productId: id });

    var ref = new Firebase("https://shophopanalytics.firebaseio.com");

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
    var qrCode = this.state.productId === null ? null : <QRCode value={this.state.productId} />
    return (
      <div>
        {qrCode}
        <form>
          <input type="text" name="name" placeholder="Product Name" ref="name" />
          <input type="text" name="brand" placeholder="Brand or Designer" ref="brand" />
          <input type="text" name="store" placeholder="Store" ref="store" />
          <input type="textarea" name="description" placeholder="Description" ref="description" />
          <input type="text" name="category" placeholder="Category" ref="category" />
        </form>
        <div onClick={this.addProduct}>Add Product</div>
      </div>
    );
  }
});

module.exports = NewProductContainer;