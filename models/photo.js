'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  
  Photo.init({
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnsplashUrl(value) {
          if (!value.startsWith('https://images.unsplash.com/')) {
            throw new Error('Invalid image URL. Must be from Unsplash.');
          }
        }
      }
    },
    description: DataTypes.TEXT,
    altDescription: DataTypes.TEXT,
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        validateTags(value) {
          if (value.length > 5) {
            throw new Error('Maximum 5 tags allowed');
          }
          if (value.some(tag => tag.length > 20)) {
            throw new Error('Each tag must not exceed 20 characters');
          }
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Photo',
    tableName: 'photos'
  });
  
  return Photo;
};