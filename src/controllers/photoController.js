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

module.exports = {
    searchPhotos
};