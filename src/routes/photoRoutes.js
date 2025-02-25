const express = require('express');
const router = express.Router();
const { searchPhotos } = require('../controllers/photoController');

router.get('/search', searchPhotos);

module.exports = router;