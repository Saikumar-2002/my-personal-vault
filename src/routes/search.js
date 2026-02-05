const express = require('express');
const router = express.Router();
const { searchContent } = require('../controllers/searchController');
const { protect } = require('../middleware/auth');

router.get('/', protect, searchContent);

module.exports = router;
