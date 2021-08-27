const mongoose = require('mongoose');

const previewSchema = mongoose.Schema({
    data: String,
    createdAt: { type: Date, expires: '30m', default: Date.now }
});

const Preview = mongoose.model('Preview', previewSchema);

module.exports = Preview;