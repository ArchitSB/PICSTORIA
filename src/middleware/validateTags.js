const validateTags = async (req, res, next) => {
    const { tags } = req.body;
    
    if (!Array.isArray(tags)) {
        return res.status(400).json({ error: 'Tags must be an array' });
    }

    // Check if tags are non-empty strings
    if (tags.some(tag => typeof tag !== 'string' || tag.trim().length === 0)) {
        return res.status(400).json({ error: 'Tags must be non-empty strings' });
    }

    // Trim tags and remove duplicates
    req.body.tags = [...new Set(tags.map(tag => tag.trim()))];

    next();
};

module.exports = validateTags;