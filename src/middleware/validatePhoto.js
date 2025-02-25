const validatePhoto = (req, res, next) => {
    const { imageUrl, tags, userId } = req.body;
  
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }
  
    if (!imageUrl.startsWith('https://images.unsplash.com/')) {
      return res.status(400).json({ error: 'Invalid image URL. Must be from Unsplash.' });
    }
  
    if (tags) {
      if (!Array.isArray(tags)) {
        return res.status(400).json({ error: 'Tags must be an array' });
      }
  
      if (tags.length > 5) {
        return res.status(400).json({ error: 'Maximum 5 tags allowed' });
      }
  
      if (tags.some(tag => tag.length > 20)) {
        return res.status(400).json({ error: 'Each tag must not exceed 20 characters' });
      }
    }
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    next();
  };
  
  module.exports = validatePhoto;