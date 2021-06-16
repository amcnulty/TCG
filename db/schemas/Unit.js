const mongoose = require('mongoose');
/**
 * Can be used as model for individual units or a summary of many units.
 */
const unitSchema = mongoose.Schema({
    // Unit number or designation
    unitName: String,
    // Monthly rent in dollar amount
    monthlyRent: Number,
    // Is this unit available
    available: Boolean,
    // Width in feet
    width: Number,
    // Height in feet
    height: String,
    // Depth in feet
    depth: Number,
    // Square Footage
    squareFeet: Number,
    // Total number of this type of unit when using as summary
    numberOfUnitsByType: Number
});

module.exports = unitSchema;