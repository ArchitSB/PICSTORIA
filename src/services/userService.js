const { User } = require('../../models');

const doesUserExist = async (email) => {
    const existingUser = await User.findOne({ where: { email } });
    return !!existingUser;
};

const createUser = async (userData) => {
    return await User.create(userData);
};

module.exports = {
    doesUserExist,
    createUser
};
