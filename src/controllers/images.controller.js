const Image = require('../models/Image.model');
const path = require('path');

module.exports.imagesController = {
  upload: async (req, res) => {
    const imageName = Math.round(Math.random() * 10000000);
    const image = req.files.image;
    image.mv(path.resolve('src', 'uploads', 'images', `${imageName}-${image.name}`));
    const newImage = await Image.create({
      name: `${imageName}-${image.name}`,
    });
    res.json(newImage);
    try {
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
