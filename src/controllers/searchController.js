const Note = require('../models/Note');
const Image = require('../models/Image');
const Video = require('../models/Video');

// @desc    Search all content
// @route   GET /api/v1/search
// @access  Private
const searchContent = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        // Search notes (text index)
        const notes = await Note.find({
            user: req.user.id,
            $text: { $search: query }
        }).populate('category tags');

        // Regex search for others
        const regex = new RegExp(query, 'i');

        const images = await Image.find({
            user: req.user.id,
            $or: [
                { originalName: regex },
                { description: regex }
            ]
        }).populate('category tags');

        const videos = await Video.find({
            user: req.user.id,
            $or: [
                { title: regex },
                { description: regex }
            ]
        }).populate('category tags');

        res.json({
            notes,
            images,
            videos,
            count: notes.length + images.length + videos.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { searchContent };
