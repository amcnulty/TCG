var express = require('express');
var router = express.Router();
const Location = require('../db/schemas/Location');
const Preview = require('../db/schemas/Preview');
const User = require('../db/schemas/User');

/*
*          !!##########################!!
*          !!                          !!
*          !!          Users           !!
*          !!                          !!
*          !!##########################!!
*/

router.post('/user/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong!', err);
    }
    if (!user) return res.status(404).send('Username not found!');
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        return res.status(401).send('Invalid password!');
      }
      if (isMatch && isMatch === true) {
        req.session.user = user;
        return res.status(200).send(req.session.user);
      }
      else if (!isMatch) {
        return res.status(401).send('Invalid password!');
      }
    });
  });
});

router.post('/user/logout', (req, res) => {
  req.session.destroy();
  res.status(200).send();
});

router.post('/user/create', (req, res) => {
  const newUser = new User({...req.body});

  User.findOne({
    username: newUser.username
  }, (err, user) => {
    if (err) {
      const err = new Error('Something went wrong!');
      err.status = 500;
      return next(err);
    }
    if (user) {
      const err = new Error('The requested username is already taken!!');
      err.status = 202;
      return next(err);
    }
    else {
      newUser.save(err => {
        if (err) {
          const err = new Error('Something went wrong!');
          err.status = 500;
          return next(err);
        }
        return res.status(200).send();
      });
    }
  });
});

router.get('/user/is-logged-in', (req, res, next) => {
  if (req.session.user) {
    res.status(200).send({...req.session.user, password: ''});
  }
  else {
    res.status(401).send('You are not logged in!');
  }
});

/*
*          !!##########################!!
*          !!                          !!
*          !!        Locations         !!
*          !!                          !!
*          !!##########################!!
*/

/**
 * Get all locations that are not in draft state.
 */
router.get('/locations', (req, res, next) => {
  Location.find({ isDraft: false })
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
  Location.findOne({ slug: req.params.slug, isDraft: false })
  .then(location => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(location);
  })
  .catch(next);
});

router.get('/location/preview/:id', (req, res, next) => {
  console.log('here', req.params.id);
  Preview.findById(req.params.id)
  .then(location => {
    console.log(location);
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
    paymentMarkupPercent: parseFloat(req.body.paymentMarkupPercent),
    paymentMarkupFixed: parseFloat(req.body.paymentMarkupFixed),
    coordinates: req.body.coordinates,
    slug: req.body.slug,
    addressFirstLine: req.body.addressFirstLine,
    addressSecondLine: req.body.addressSecondLine,
    thumbnailImage: req.body.thumbnailImage,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    detailPageImages: req.body.detailPageImages,
    features: req.body.features,
    units: req.body.units,
    unitSummary: req.body.unitSummary,
    contactName: req.body.contactName,
    contactEmail: req.body.contactEmail,
    contactPhone: req.body.contactPhone,
    bannerImage: req.body.bannerImage,
    extras: req.body.extras
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
