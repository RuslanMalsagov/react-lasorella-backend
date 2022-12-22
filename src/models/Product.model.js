const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  weight: Number,
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  photo: { type: mongoose.SchemaTypes.ObjectId, ref: 'Image' },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
