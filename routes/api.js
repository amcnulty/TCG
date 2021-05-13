var express = require('express');
var router = express.Router();
const Location = require('../db/schemas/Location');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource from the super fancy api!!!');
});

/**
 * Get all locations
 */
router.get('/locations', (req, res, next) => {
  Location.find()
  .then(locations => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(locations);
  })
  .catch(next)
});

/**
 * Create a new location
 */
router.post('/location', (req, res, next) => {
  console.log('req.body :>> ', req.body);
  Location.create({
    name: req.body.name,
    paypalEmail: req.body.paypalEmail,
    enablePayments: req.body.enablePayments,
    paymentMarkup: parseFloat(req.body.paymentMarkup),
    coordinates: req.body.coordinates,
    slug: req.body.slug
  })
  .then(location => {
    console.log('location created :>> ', location);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(location);
  })
  .catch(error => next(error));
});

module.exports = router;
