const express = require('express');
const router = express.Router();
const { searchPhotos, savePhoto } = require('../controllers/photoController');
const validatePhoto = require('../middleware/validatePhoto');

router.get('/search', searchPhotos);
router.post('/', validatePhoto, savePhoto);

module.exports = router;