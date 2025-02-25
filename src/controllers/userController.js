const { doesUserExist, createUser } = require('../services/userService');
const { User } = require('../../models');

const createNewUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const user = await User.create({
            username,
            email
        });

        return res.status(201).json({
            message: 'User created successfully',
            user
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Error creating user' });
    }
};

module.exports = {
    createNewUser
};