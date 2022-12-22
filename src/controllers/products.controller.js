const Product = require('../models/Product.model');

module.exports.productsController = {
  postProduct: async (req, res) => {
    try {
      const { name, price, description, weight, photo, review } = req.body;

      const product = await Product.create({
        name,
        price,
        description,
        weight,
        photo,
        review,
      });

      res.json(product);
    } catch (error) {
      console.log('postProduct', error);
      res.json(error);
    }
  },

  patchProduct: async (req, res) => {
    try {
      const { name, price, description, weight, photo, review } = req.body;

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
          description,
          weight,
          photo,
          review,
        },
        { new: true },
      );

      res.json(product);
    } catch (error) {
      console.log('patchProduct', error);
      res.json(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndRemove(req.params.id);
      res.json(`${product} удален!`);
    } catch (error) {
      console.log('deleteProduct', error);
      res.json(error);
    }
  },

  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.log('getProduct', error);
      res.json(error);
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (error) {
      console.log('getProductById', error);
      res.json(error);
    }
  },
};
