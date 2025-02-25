'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // Define association using the models parameter
      Tag.belongsTo(models.Photo, { 
        foreignKey: 'photoId' 
      });
    }
  }

  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoId: {
      type: DataTypes.INTEGER,
      references: { 
        model: 'photos',
        key: 'id' 
      },
    }
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags'
  });

  return Tag;
};