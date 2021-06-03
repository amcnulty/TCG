const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    // Primary display name
    name: String,
    // Email associated with the account payments will be sent to if PayPal is enabled.
    paypalEmail: String,
    // If true will display a PayPal button on location page and will use associated PayPal Email
    enablePayments: Boolean,
    // Payment percentage expressed as a decimal. Example 2.9% is .029
    paymentMarkup: Number,
    // Latitude and longitude points where this location will be marked on the map. Example [39.0175412, -94.7569592]
    coordinates: [Number],
    // Url slug that will load this record. (Must be unique)
    slug: {
        type: String,
        unique: true
    },
    // First line of the display address
    addressFirstLine: String,
    // Second line of the display address
    addressSecondLine: String,
    // Address of thumbnail image
    thumbnailImageUrl: String,
    // A short description to be shown on the map popover
    shortDescription: {
        type: String,
        maxLength: 140
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;