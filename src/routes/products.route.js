const { Router } = require('express');

const router = Router();

const { productsController } = require('../controllers/products.controller');

router.post('/add', productsController.postProduct);
router.patch('/patch', productsController.patchProduct);
router.delete('/delete', productsController.deleteProduct);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);

module.exports = router;
