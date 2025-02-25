'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SearchHistory extends Model {
    static associate(models) {
      SearchHistory.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  SearchHistory.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    query: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SearchHistory',
    tableName: 'searchHistories'
  });

  return SearchHistory;
};