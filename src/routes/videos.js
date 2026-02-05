const express = require('express');
const router = express.Router();
const { getVideos, createVideo, deleteVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, getVideos)
    .post(protect, createVideo);

router.route('/:id')
    .delete(protect, deleteVideo);

module.exports = router;
