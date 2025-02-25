const { doesUserExist, createUser } = require('../services/userService');

const createNewUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        // Check if user already exists
        const userExists = await doesUserExist(email);
        if (userExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create new user
        const user = await createUser({ username, email });

        return res.status(201).json({
            message: 'User created successfully',
            user
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createNewUser
};