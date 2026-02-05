const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    filename: {
        type: String,
        unique: true,
        sparse: true
    },
    originalName: {
        type: String,
        required: true
    },
    path: {
        type: String
    },
    data: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
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

module.exports = mongoose.model('Image', imageSchema);
