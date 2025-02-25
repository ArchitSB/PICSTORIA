const validateSearchHistory = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId) || parsedUserId <= 0) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    req.query.userId = parsedUserId;
    next();
};

module.exports = validateSearchHistory;