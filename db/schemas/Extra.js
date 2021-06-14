const mongoose = require('mongoose');
/**
 * Model for pricing extras additional to unit rental.
 */
const extraSchema = mongoose.Schema({
    // Price of the extra
    price: Number,
    // Fequency that this extra is charged (monthly, quarterly, yearly, one time)
    frequency: String,
    // description of the extra
    details: String
});

module.exports = extraSchema;