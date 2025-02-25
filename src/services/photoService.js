const axios = require('axios');
const { Photo, SearchHistory } = require('../../models');
const { Op } = require('sequelize');



const searchPhotosByTag = async (tag, sort = 'ASC', userId = null) => {
    // Log search history if userId is provided
    if (userId) {
        await SearchHistory.create({
            userId,
            query: tag
        });
    }

    // Search photos with the given tag
    const photos = await Photo.findAll({
        where: {
            tags: {
                [Op.contains]: [tag]
            }
        },
        order: [['createdAt', sort]],
        attributes: ['id', 'imageUrl', 'description', 'tags', 'createdAt']
    });

    return photos;
};


const searchImages = async (query) => {
    if (!process.env.UNSPLASH_ACCESS_KEY) {
        throw new Error('UNSPLASH_ACCESS_KEY is not configured in .env file');
    }

    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query },
            headers: {
                'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
            }
        });

        if (!response.data.results.length) {
            return { message: 'No images found for the given query.' };
        }

        const photos = response.data.results.map(photo => ({
            imageUrl: photo.urls.regular,
            description: photo.description || '',
            altDescription: photo.alt_description || ''
        }));

        return { photos };
    } catch (error) {
        throw new Error(`Failed to fetch images: ${error.message}`);
    }
};

module.exports = {
    searchImages,
    searchPhotosByTag
};