const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourController.loadTourById);

router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.validateTourData, tourController.createTour)

router.route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = router;