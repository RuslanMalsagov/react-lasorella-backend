const { Router } = require('express');

const router = Router();

const { imagesController } = require('../controllers/images.controller');

router.post('/upload-img', imagesController.upload);

module.exports = router;
