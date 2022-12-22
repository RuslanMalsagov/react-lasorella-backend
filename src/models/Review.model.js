const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  product: { type: mongoose.SchemaTypes.ObjectId, default: 'Product' },
  text: { type: String, required: true },
  user: { type: mongoose.SchemaTypes.ObjectId, default: 'User' },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
