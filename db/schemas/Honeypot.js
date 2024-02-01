const mongoose = require('mongoose');
/**
 * Honeypot info for bots that have been caught trying to submit forms on the website.
 */
const honeypotSchema = mongoose.Schema({
    // Time stamp of the event
    timestamp: String,
    // request data
    requestData: String
});

const Honeypot = mongoose.model('Honeypot', honeypotSchema);

module.exports = Honeypot;
