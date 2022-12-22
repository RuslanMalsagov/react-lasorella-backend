const { Router } = require('express');
const router = Router();

router.use(require('./users.route'));
router.use('/product', require('./products.route'));
router.use('/review', require('./reviews.route'));
router.use('/category', require('./categories.route'));

module.exports = router;
