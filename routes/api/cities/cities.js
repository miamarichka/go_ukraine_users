const express = require('express');
const CTRL = require('../../../controllers/cities')

const router = express.Router();

router.get('/:city/info', CTRL.getInfo);
router.post('/:city/info', CTRL.getInfo);
router.get('/:city/route', CTRL.getRoute);
router.get('/:city/hotels', CTRL.getHotels);
router.get('/:city/restaurants', CTRL.getRestaurants);
router.get('/:city/entertainment', CTRL.getEntertm);

module.exports = router;