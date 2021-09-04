var express = require('express');
const mongoose = require('mongoose');
const Location = require('../db/schemas/Location');
const Preview = require('../db/schemas/Preview');
var router = express.Router();
const User = require('../db/schemas/User');
const axios = require('axios');

router.get('/', (req, res, next) => {
  res.send('respond with a protected resource');
});

/*
*          !!##########################!!
*          !!                          !!
*          !!          Users           !!
*          !!                          !!
*          !!##########################!!
*/

const isAdmin = (req, res, next) => {
  if (!req.session.user.isAdmin) {
    const err = new Error('Not authorized! Admin access required.');
    err.status = 401;
    return next(err);
  }
  next();
}

router.post('/user/create', isAdmin, (req, res) => {
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

router.get('/user/get-all-users', isAdmin, (req, res, next) => {
  User.find({}, { password: 0 }, (err, users) => {
    if (err) {
      const err = new Error('Something went wrong!');
      err.status = 500;
      return next(err);
    }
    return res.status(200).send(users);
  });
});

router.delete('/user/:id', isAdmin, (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      const err = new Error('Something went wrong!');
      err.status = 500;
      return next(err);
    }
    if (!user) {
      const err = new Error('User Id not found!');
      err.status = 404;
      return next(err);
    }
    else {
      return res.status(200).send();
    }
  });
});
/*
*          !!##########################!!
*          !!                          !!
*          !!        Locations         !!
*          !!                          !!
*          !!##########################!!
*/

/**
 * Get all locations and drafts for a user. Super admin gets all drafts and information on whos draft it is.
 */
router.get('/locations', (req, res, next) => {
  let query;
  let popOptions = '';
  if (req.session.user.isSuperAdmin) {
    query = null;
    popOptions = 'createdBy';
  }
  else if (req.session.user.isAdmin) {
    query = { $or: [{ isDraft: false }, { createdBy: req.session.user._id }] };
  }
  else {
    query = { createdBy: req.session.user._id };
  }
  Location.find(query)
  .populate(popOptions)
  .then(locations => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(locations);
  })
  .catch(next)
});

/**
 * Get location from id. This is used when editing a draft location.
 */
 router.get('/location/:id', (req, res, next) => {
  Location.findById(req.params.id)
  .then(location => {
    if (!location) {
      res.status(404).send('No location found with that id!');
    }
    // If below super admin don't allow access to other people's drafts.
    else if (!req.session.user.isSuperAdmin && location.isDraft && !location.createdBy.equals(req.session.user._id)) {
      res.status(401).send('Not authorized! Unable to edit a draft created by another user.');
    }
    // If below admin don't allow access to other people's records.
    else if (!req.session.user.isAdmin && !location.createdBy.equals(req.session.user._id)) {
      res.status(401).send('You don\'t have access to this record!');
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(location);
    }
  })
  .catch(next);
});

router.post('/location', (req, res, next) => {
  console.log('req.body :>> ', req.body);
  Location.create({
    ...(req.body.name && {name: req.body.name}),
    ...(req.body.paypalEmail && {paypalEmail: req.body.paypalEmail}),
    ...(req.body.enablePayments && {enablePayments: req.body.enablePayments}),
    ...(req.body.paymentMarkupPercent && {paymentMarkupPercent: parseFloat(req.body.paymentMarkupPercent)}),
    ...(req.body.paymentMarkupFixed && {paymentMarkupFixed: parseFloat(req.body.paymentMarkupFixed)}),
    ...(req.body.coordinates && {coordinates: req.body.coordinates}),
    ...(req.body.slug && {slug: req.body.slug}),
    ...(req.body.addressFirstLine && {addressFirstLine: req.body.addressFirstLine}),
    ...(req.body.addressSecondLine && {addressSecondLine: req.body.addressSecondLine}),
    ...(req.body.thumbnailImage && {thumbnailImage: req.body.thumbnailImage}),
    ...(req.body.shortDescription && {shortDescription: req.body.shortDescription}),
    ...(req.body.longDescription && {longDescription: req.body.longDescription}),
    ...(req.body.detailPageImages && {detailPageImages: req.body.detailPageImages}),
    ...(req.body.features && {features: req.body.features}),
    ...(req.body.units && {units: req.body.units}),
    ...(req.body.unitSummary && {unitSummary: req.body.unitSummary}),
    ...(req.body.contactName && {contactName: req.body.contactName}),
    ...(req.body.contactEmail && {contactEmail: req.body.contactEmail}),
    ...(req.body.contactPhone && {contactPhone: req.body.contactPhone}),
    ...(req.body.bannerImage && {bannerImage: req.body.bannerImage}),
    ...(req.body.extras && {extras: req.body.extras}),
    ...(req.body.isDraft && {isDraft: true}),
    ...(req.body.isPublished && {isPublished: false}),
    createdBy: req.session.user._id
  })
  .then(location => {
    console.log('location created :>> ', location);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(location);
  })
  .catch(error => {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).send('Current value already in use, url slug must be unique. Choose another value!');
    }
    else {
      res.status(error.status ? error.status : 500).send(error.message ? error.message : 'There was a problem processing the request.');
    }
  });
});

router.put('/location', (req, res, next) => {
  if (!req.body._id) {
    const err = new Error('_id field not found and is required for update operation.');
    err.status = 400;
    next(err);
    return
  }
  // If you are a normal user make sure location belongs to you before updating. Also check user's max location allowance if this is a publish operation.
  if (!req.session.user.isAdmin) {
    Location.findById(req.body._id)
    .then(location => {
      // If this location is not published and user is trying to publish first check there location allowance.
      let promise;
      if (!location.isPublished && req.body.isPublished) {
        promise = Location.count({createdBy: req.session.user._id, isPublished: true});
      }
      else {
        promise = new Promise((resolve, reject) => resolve());
      }
      promise.then(count => {
        if (count >= req.session.user.maxLocationAllowance) {
          res.status(401).send('Unable to publish location maximum location allowance has been reached.');
          return;
        }
        let imagesToBeDeleted = [];
        if (location.bannerImage && location.bannerImage.src !== (req.body.bannerImage && req.body.bannerImage.src)) {
          imagesToBeDeleted.push(location.bannerImage.src);
        }
        if (location.detailPageImages && req.body.detailPageImages) {
          imagesToBeDeleted = imagesToBeDeleted.concat(
            location.detailPageImages.filter(image => !req.body.detailPageImages.find(requestImage => requestImage.src === image.src))
            .map(item => item.src)
          );
        }
        if (location.thumbnailImage && location.thumbnailImage.src !== (req.body.thumbnailImage && req.body.thumbnailImage.src)) {
          imagesToBeDeleted.push(location.thumbnailImage.src);
        }
        imagesToBeDeleted = imagesToBeDeleted.map(url => url.match(/TCG.[^.]*/)[0]);
  
        axios.delete(`https://${process.env.API_KEY}:${process.env.API_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/resources/image/upload?${imagesToBeDeleted.map(url => 'public_ids[]=' + url).join('')}`)
        .then(res => {
          console.log('The Following Images Were Deleted:', imagesToBeDeleted);
        })
        .catch(err => {
          console.log(err);
        });
  
        // Get location by id and check if it is created by the current user.
        Location.findOneAndUpdate({ _id: req.body._id, createdBy: req.session.user._id }, req.body)
        .then(location => {
          if (!location) {
            res.status(401).send('You don\'t have access to this location!');
          }
          else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(location);
          }
        }, err => {
          console.log(err);
          if (err.code === 11000 && err.codeName === 'DuplicateKey') {
            res.status(400).send('Current value already in use, url slug must be unique. Choose another value!');
          }
          else {
            res.status(err.status ? err.status : 500).send(err.message ? err.message : 'There was an error processing this request.');
          }
        });
      })
      .catch(err => {
        res.status(err.status ? err.status : 500).send(err.message ? err.message : 'The was an error processing this request.');
      });
    })
    .catch(err => {
      res.status(err.status ? err.status : 500).send(err.message ? err.message : 'There was an error processing this request.');
    });
  }
  else {
    Location.findById(req.body._id)
    .then(location => {
      let imagesToBeDeleted = [];
      if (location.bannerImage && location.bannerImage.src !== (req.body.bannerImage && req.body.bannerImage.src)) {
        imagesToBeDeleted.push(location.bannerImage.src);
      }
      if (location.detailPageImages && req.body.detailPageImages) {
        imagesToBeDeleted = imagesToBeDeleted.concat(
          location.detailPageImages.filter(image => !req.body.detailPageImages.find(requestImage => requestImage.src === image.src))
          .map(item => item.src)
        );
      }
      if (location.thumbnailImage && location.thumbnailImage.src !== (req.body.thumbnailImage && req.body.thumbnailImage.src)) {
        imagesToBeDeleted.push(location.thumbnailImage.src);
      }
      imagesToBeDeleted = imagesToBeDeleted.map(url => url.match(/TCG.[^.]*/)[0]);

      axios.delete(`https://${process.env.API_KEY}:${process.env.API_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/resources/image/upload?${imagesToBeDeleted.map(url => 'public_ids[]=' + url).join('')}`)
      .then(res => {
        console.log('The Following Images Were Deleted:', imagesToBeDeleted);
      })
      .catch(err => {
        console.log(err);
      });

      Location.findByIdAndUpdate(req.body._id, req.body)
      .then(location => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
      }, err => {
        console.log(err);
        if (err.code === 11000 && err.codeName === 'DuplicateKey') {
          res.status(400).send('Current value already in use, url slug must be unique. Choose another value!');
        }
        else {
          res.status(err.status).send(err.message);
        }
      });
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
  }
});

router.post('/location/preview', (req, res, next) => {
  Preview.create(req.body)
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(error => next(error));
});

router.post('/location/hide/:id', (req, res, next) => {
  if (!req.params.id) {
    const err = new Error('_id field not found and is required for update operation.');
    err.status = 400;
    next(err);
    return
  }
  Location.findById(req.params.id)
  .then(location => {
    // If below admin and location is not yours don't allow hide operation.
    if (!req.session.user.isAdmin && !location.createdBy.equals(req.session.user._id)) {
      res.status(401).send('Not authorized! Unable to hide this location!');
    }
    else {
      Location.findByIdAndUpdate(req.params.id, {isPublished: false})
      .then(location => {
        res.status(200).send('Update Successful');
      })
      .catch(err => {
        res.status(err.status ? err.status : 500).send(err.message ? err.message : 'There was a problem updating this location.');
      });
    }
  })
  .catch(err => {
    res.status(err.status ? err.status : 500).send(err.message ? err.message : 'There was a problem updating this location.');
  });
});

router.delete('/location/:id', (req, res, next) => {
  if (!req.params.id) {
    const err = new Error('_id field not found and is required for update operation.');
    err.status = 400;
    next(err);
    return
  }
  Location.findById(req.params.id)
  .then(location => {
    // If below admin and location is not yours don't allow delete operation.
    if (!req.session.user.isAdmin && !location.createdBy.equals(req.session.user._id)) {
      res.status(401).send('Not authorized! Unable to delete this location!');
    }
    else {
      Location.findByIdAndDelete(req.params.id)
      .then(location => {
        res.status(200).send('Location Deleted.');
      })
      .catch(err => {
        res.status(err.status ? err.status : 500).send(err.message ? err.message : 'There was a problem deleting this location.');
      });
    }
  })
  .catch(err => {
    res.status(err.status ? err.status : 500).send(err.message ? err.message : 'There was a problem deleting this location.');
  });
});
/*
*          !!#########################!!
*          !!                         !!
*          !!         Images          !!
*          !!                         !!
*          !!#########################!!
*/

router.get('/image-upload-credentials', (req, res, next) => {
  return res.status(200).send({
    UPLOAD_PRESET: process.env.UPLOAD_PRESET,
    API_KEY: process.env.API_KEY,
    CLOUD_NAME: process.env.CLOUD_NAME
  });
});

module.exports = router;
