const validateSearch = (req, res, next) => {
    const { tags, sort } = req.query;

    if (!tags) {
        return res.status(400).json({ error: 'Tag parameter is required' });
    }

    if (sort && !['ASC', 'DESC'].includes(sort.toUpperCase())) {
        return res.status(400).json({ error: 'Sort parameter must be ASC or DESC' });
    }

    req.query.sort = (sort || 'ASC').toUpperCase();

    next();
};

module.exports = validateSearch;