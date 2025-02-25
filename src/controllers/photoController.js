const { Photo } = require('../../models');
const { searchImages } = require('../services/photoService');

const searchPhotos = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    try {
        const result = await searchImages(query);
        return res.json(result);
    } catch (error) {
        console.error('Error searching photos:', error);
        return res.status(500).json({ error: error.message });
    }
};

const savePhoto = async (req, res) => {
    try {
      const photoData = {
        imageUrl: req.body.imageUrl,
        description: req.body.description || '',
        altDescription: req.body.altDescription || '',
        tags: req.body.tags || [],
        userId: req.body.userId
      };
  
      const photo = await Photo.create(photoData);
  
      return res.status(201).json({
        message: 'Photo saved successfully',
        photo
      });
    } catch (error) {
      console.error('Error saving photo:', error);
      return res.status(500).json({ 
        error: error.message || 'Error saving photo'
      });
    }
  };

module.exports = {
    searchPhotos,
    savePhoto
};