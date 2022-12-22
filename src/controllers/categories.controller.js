const Category = require('../models/Category.model');

module.exports.categoriesController = {
  postCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.create({
        name,
      });
      res.json(category);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  
  deleteCategory: async (req, res) => {
    try {
      res.json();
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },

  patchCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOneAndUpdate(
        { name },
        {
          name,
        },
      );
      res.json(category);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },

  getCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
