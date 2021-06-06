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
 * Get location from slug
 */
router.get('/location/:slug', (req, res, next) => {
  console.log('req.params :>> ', req.params);
  Location.findOne({ slug: req.params.slug })
  .then(location => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(location);
  })
  .catch(next);
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
    slug: req.body.slug,
    addressFirstLine: req.body.addressFirstLine,
    addressSecondLine: req.body.addressSecondLine,
    thumbnailImageUrl: req.body.thumbnailImageUrl,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    detailPageImages: req.body.detailPageImages,
    features: req.body.features,
    units: req.body.units,
  })
  .then(location => {
    console.log('location created :>> ', location);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(location);
  })
  .catch(error => next(error));
});

/**
 * Updates single existing location based on matching query
 */
router.put('/location', (req, res, next) => {
  console.log('req.body :>> ', req.body);
  Location.findOneAndUpdate(req.body.query, req.body.payload, { new: true})
  .then(document => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(document);
  });
});

/**
 * Updates many existing locations based on matching query
 */
router.put('/locations', (req, res, next) => {
  console.log('req.body :>> ', req.body);
  Location.updateMany(req.body.query, req.body.payload, { new: true })
  .then(documents => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(document);
  });
});

module.exports = router;
