const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
