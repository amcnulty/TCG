const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: String,
    paypalEmail: String,
    enablePayments: Boolean,
    paymentMarkup: Number,
    coordinates: [Number],
    slug: String
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;