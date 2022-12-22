const { Router } = require('express');
const router = Router();

router.use(require('./users.route'));
router.use('/product', require('./products.route'));
router.use('/review', require('./reviews.route'));

module.exports = router;
