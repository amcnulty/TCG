const mongoose = require('mongoose');
/**
 * Model for video data used on the detail page
 */
const videoSchema = mongoose.Schema({
    // Video source
    src: String,
    // Poster source
    poster: String
});

module.exports = videoSchema;
