const express = require('express');
const router = express.Router();
const { searchPhotos, savePhoto, addTags, searchByTag } = require('../controllers/photoController');
const validatePhoto = require('../middleware/validatePhoto');
const validateTags = require('../middleware/validateTags');
const validateSearch = require('../middleware/validateSearch');


router.get('/search', searchPhotos);
router.post('/', validatePhoto, savePhoto);
router.post('/:photoId/tags', validateTags, addTags);
router.get('/tag/search', validateSearch, searchByTag);


module.exports = router;