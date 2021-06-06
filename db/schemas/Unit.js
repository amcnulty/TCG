const mongoose = require('mongoose');

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
    height: Number,
    // Depth in feet
    depth: Number,
    // Square Footage
    squareFeet: Number
});

module.exports = unitSchema;