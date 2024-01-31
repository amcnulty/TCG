var express = require('express');
var router = express.Router();
const Location = require('../db/schemas/Location');
const Preview = require('../db/schemas/Preview');
const User = require('../db/schemas/User');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

router.get('/user/is-logged-in', (req, res, next) => {
  if (req.session.user) {
    const response = {...req.session.user};
    delete response.password;
    res.status(200).send(response);
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
  Preview.findById(req.params.id)
  .then(location => {
    console.log(location);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(location);
  })
  .catch(next);
});

/*
*          !!##########################!!
*          !!                          !!
*          !!          Email           !!
*          !!                          !!
*          !!##########################!!
*/

/**
 * Handle the sign up form submission and email.
 */
router.post('/seminar/sign-up', (req, res, next) => {
  // Catch honeypot requests and send 200 response to not alert anything is wrong
  if (req.body && req.body.username) {
    return res.status(200).send('sign up complete');
  }
  sgMail.send({
    to: ['kevin.combs@contractorgarage.com', 'kcombs@insightcommercial.net'],
    bcc: ['aaron.mcnulty@contractorgarage.com', 'amcnulty88@swbell.net'],
    from: 'webmaster@contractorgarage.com',
    templateId: 'd-558864b6508d4cb2880a7c7b45e24b35',
    dynamicTemplateData: req.body,
  }).then(() => {
    res.status(200).send();
  }).catch(next);
})

module.exports = router;
