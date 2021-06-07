const mongoose = require('mongoose');
/**
 * Model for image data used in the carousel
 */
const imageSchema = mongoose.Schema({
    // Image source
    src: String,
    // Thumbnail source
    thumbnail: String,
    // Caption text
    alt: String
});

module.exports = imageSchema;