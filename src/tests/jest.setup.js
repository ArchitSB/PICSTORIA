const { sequelize } = require('../../models');

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    // Sync all tables and force recreate them
    await sequelize.sync({ force: true });
    
    // Create a test user first since it's required by foreign keys
    const { User } = require('../../models');
    await User.create({
      id: 1,
      username: 'testuser',
      email: 'test@example.com'
    });
  } catch (error) {
    console.error('Test database setup failed:', error);
    process.exit(1);
  }
});

afterAll(async () => {
  await sequelize.close();
});