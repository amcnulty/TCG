var express = require('express');
const Location = require('../db/schemas/Location');
var router = express.Router();
const User = require('../db/schemas/User');

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
 * Get all locations for a user
 */
router.get('/locations', (req, res, next) => {
  const query = req.session.user.isAdmin ? null : { /* query object to get locations for specific user */};
  Location.find(query)
  .then(locations => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(locations);
  })
  .catch(next)
});

module.exports = router;
