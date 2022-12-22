const Review = require('../models/Review.model');

module.exports.reviewsController = {
  postReview: async (req, res) => {
    try {
      const { product, text, user } = req.body;
      const review = await Review.create({
        product,
        text,
        user,
      });

      res.json(review);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  
  deleteReview: async (req, res) => {
    try {
      const { id } = req.body;
      await Review.findByIdAndRemove(id);
      res.json('Ваш отзыв удален');
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },

  getReviews: async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
