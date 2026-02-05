const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    color: {
        type: String,
        default: '#3B82F6'
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
