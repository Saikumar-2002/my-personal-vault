const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/v1/videos
// @access  Private
const getVideos = async (req, res) => {
    try {
        const videos = await Video.find({ user: req.user.id })
            .populate('category', 'name color')
            .populate('tags', 'name')
            .sort({ updatedAt: -1 });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a video
// @route   POST /api/v1/videos
// @access  Private
const createVideo = async (req, res) => {
    try {
        const { title, url, description, category, tags } = req.body;

        const video = new Video({
            user: req.user.id,
            title,
            url,
            description,
            category,
            tags
        });

        const createdVideo = await video.save();
        res.status(201).json(createdVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a video
// @route   DELETE /api/v1/videos/:id
// @access  Private
const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (video) {
            if (video.user.toString() !== req.user.id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await video.deleteOne();
            res.json({ message: 'Video removed' });
        } else {
            res.status(404).json({ message: 'Video not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getVideos, createVideo, deleteVideo };
