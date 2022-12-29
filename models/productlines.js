'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductLines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Products }) {
      this.hasMany(Products, { foreignKey: "productLine_id" })
    }
  }
  ProductLines.init({
    pl_name: DataTypes.STRING,
    pl_description: DataTypes.TEXT,
    warranty_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductLines',
  });
  return ProductLines;
};