const Tag = require('../models/Tag');

// @desc    Get all tags
// @route   GET /api/v1/tags
// @access  Private
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({ user: req.user.id });
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a tag
// @route   POST /api/v1/tags
// @access  Private
const createTag = async (req, res) => {
    try {
        const { name } = req.body;

        const tag = new Tag({
            user: req.user.id,
            name
        });

        const createdTag = await tag.save();
        res.status(201).json(createdTag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTags, createTag };
