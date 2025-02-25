const { SearchHistory } = require('../../models');

const getUserSearchHistory = async (req, res) => {
    try {
        const { userId } = req.query;

        const searchHistory = await SearchHistory.findAll({
            where: { userId },
            attributes: ['query', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        if (!searchHistory.length) {
            return res.status(404).json({ 
                message: 'No search history found for this user' 
            });
        }

        return res.json({
            searchHistory: searchHistory.map(history => ({
                query: history.query,
                timestamp: history.createdAt
            }))
        });
    } catch (error) {
        console.error('Error fetching search history:', error);
        return res.status(500).json({ error: 'Error fetching search history' });
    }
};

module.exports = {
    getUserSearchHistory
};