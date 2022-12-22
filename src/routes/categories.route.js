const { Router } = require('express');
const { categoriesController } = require('../controllers/categories.controller');

const router = Router();

router.post('/', categoriesController.postCategory);
router.patch('/:id', categoriesController.patchCategory);
router.get('/', categoriesController.getCategory);
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
