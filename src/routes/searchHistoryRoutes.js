const express = require('express');
const router = express.Router();
const { getUserSearchHistory } = require('../controllers/searchHistoryController');
const  validateSearchHistory  = require('../middleware/validateSearchHistory');

router.get('/', validateSearchHistory, getUserSearchHistory);

module.exports = router;