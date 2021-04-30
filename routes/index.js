var express = require('express');
var router = express.Router();

const startDate = new Date();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

/**
 * Endpoint used to ping the server to keep the app awake.
 */
 router.get('/ping', (req, res) => {
  res.status(200).send(`The app has been awake since: ${startDate}`);
});

module.exports = router;
