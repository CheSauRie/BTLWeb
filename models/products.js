'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    productLine_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    unit: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    warranty_time: DataTypes.STRING,
    product_history_id: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};