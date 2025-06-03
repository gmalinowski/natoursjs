
const fs = require('fs');
const toursFile = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8')
let toursData = JSON.parse(toursFile);


exports.validateTourData = (req, res, next) => {
  if (req.body.name && req.body.price)
    next();
  else
    res.status(400).json(
      {
        status: 'error',
        message: 'name and price are required'
      }
    )
};

exports.loadTourById = (req, res, next, id) => {
  const tour = toursData.find(tour => tour.id === parseInt(req.params.id));
  if (tour === undefined)
    return res.status(404).json({status: 'not found'})
  else
    req.loadedTour = tour;
    next();
}

exports.createTour = (req, res) => {

  const randomInt = Math.floor(Math.random() * 10000) + 1;

  const newTour = {
    id: randomInt,
    name: req.body.name,
    price: req.body.price,
    duration: req.body.duration,
    maxGroupSize: req.body.maxGroupSize,
    difficulty: req.body.difficulty,
    description: req.body.description,
    image: req.body.image,
    instructorId: req.body.instructorId,
  }

  toursData.push(newTour);

  res.status(200).json(newTour);
}

exports.getTourById = (req, res) => {
  const responseBody = {
    status: 'success',
    data: {
      tour: req.loadedTour
    }
  }

  res.status(200).json(responseBody);
}

exports.getAllTours = (req, res) => {
  const responseBody = {
    status: 'success',
    message: 'Retrieved all tours',
    size: toursData.length,
    data: {
      tours: toursData
    },
  }

  res.status(200).json(responseBody)
}

exports.updateTour = (req, res) => {
  const updatedTour = Object.assign(req.loadedTour, req.body);
  const tourIndex = toursData.indexOf(req.loadedTour);

  toursData[tourIndex] = updatedTour;

  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour
    }
  })
}

exports.deleteTour = (req, res) => {

  toursData = toursData.filter(t => t.id !== req.loadedTour.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: req.tour
    }
  })
}
