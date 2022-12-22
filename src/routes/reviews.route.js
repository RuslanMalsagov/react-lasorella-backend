const { Router } = require('express');

const { reviewsController } = require('../controllers/reviews.controller');
const router = Router();

router.post('/add', reviewsController.postReview);
router.delete('/delete/:id', reviewsController.postReview);
router.get('/', reviewsController.postReview);

module.exports = router;
