const { Photo, SearchHistory } = require('../../models');
const { searchImages } = require('../services/photoService');
const { searchPhotosByTag } = require('../services/photoService');
const { Op } = require('sequelize');


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

  const addTags = async (req, res) => {
    try {
        const { photoId } = req.params;
        const { tags: newTags } = req.body;

        // Find the photo
        const photo = await Photo.findByPk(photoId);
        
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        // Get existing tags
        const existingTags = photo.tags || [];
        
        // Combine existing and new tags, removing duplicates
        const combinedTags = [...new Set([...existingTags, ...newTags])];

        // Check if total tags exceed limit
        if (combinedTags.length > 5) {
            return res.status(400).json({ 
                error: 'Maximum 5 tags allowed per photo' 
            });
        }

        // Update photo with new tags
        await photo.update({ tags: combinedTags });

        return res.json({
            message: 'Tags added successfully',
            photo: {
                id: photo.id,
                tags: photo.tags
            }
        });
    } catch (error) {
        console.error('Error adding tags:', error);
        return res.status(500).json({ error: 'Error adding tags' });
    }
};

const searchByTag = async (req, res) => {
    try {
        const { tags, sort = 'ASC', userId } = req.query;

        if (userId) {
            await SearchHistory.create({
                userId,
                query: tags
            });
        }

        const photos = await Photo.findAll({
            where: {
                tags: {
                    [Op.contains]: [tags]
                }
            },
            order: [['createdAt', sort]]
        });

        if (!photos.length) {
            return res.status(404).json({
                message: 'No photos found with the specified tag'
            });
        }

        return res.json({
            photos: photos.map(photo => ({
                imageUrl: photo.imageUrl,
                description: photo.description,
                dateSaved: photo.createdAt,
                tags: photo.tags
            }))
        });
    } catch (error) {
        console.error('Error searching photos:', error);
        return res.status(500).json({ error: 'Error searching photos' });
    }
};


module.exports = {
    searchPhotos,
    savePhoto,
    addTags,
    searchByTag
};