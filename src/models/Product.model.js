const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  weight: Number,
  photo: { type: mongoose.SchemaTypes.ObjectId, ref: 'Image' },
  review: [
    {
      user: String,
      text: String,
      rating: Number,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
