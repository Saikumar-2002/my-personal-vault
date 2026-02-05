const express = require('express');
const router = express.Router();
const { getTags, createTag } = require('../controllers/tagController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, getTags)
    .post(protect, createTag);

module.exports = router;
