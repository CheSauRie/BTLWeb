'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Products }) {
      // this.hasMany(Products, { foreignKey: "stock_id" })
    }
  }
  Stocks.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    factory_id: DataTypes.INTEGER,
    agent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stocks',
  });
  return Stocks;
};