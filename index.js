const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./src/routes/userRoutes');
const photoRoutes = require('./src/routes/photoRoutes');
const searchHistoryRoutes = require('./src/routes/searchHistoryRoutes');
const path = require("path");
const cors = require("cors");


const app = express();
app.use(express.json());

app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/search-history', searchHistoryRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
      await sequelize.authenticate();
      console.log('Database connected!');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
}

module.exports = app; // Add this line
