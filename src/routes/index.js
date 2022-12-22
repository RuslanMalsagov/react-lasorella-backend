const { Router } = require('express');
const router = Router();

router.use(require('./users.route'));
router.use('/product', require('./products.route'));

module.exports = router;
