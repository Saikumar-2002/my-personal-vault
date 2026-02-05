const express = require('express');
const router = express.Router();
const { uploadImage, getImages, deleteImage } = require('../controllers/imageController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
    .get(protect, getImages);

router.post('/upload', protect, upload.single('file'), uploadImage);

router.route('/:id')
    .delete(protect, deleteImage);

module.exports = router;
