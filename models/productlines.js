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
    static associate({ Products, Status }) {
      // this.hasMany(Products, { foreignKey: "productLine_id" })
      // this.belongsTo(Status, { foreignKey: "status_id" })
    }
  }
  ProductLines.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    status_id: DataTypes.INTEGER,
    warranty_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductLines',
  });
  return ProductLines;
};