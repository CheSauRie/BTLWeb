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
    static associate({ ProductLines, Stocks }) {
      // this.belongsTo(ProductLines, { foreignKey: "productLine_id" })
      // this.belongsTo(Stocks, { foreignKey: "stock_id" })
    }
  }
  Products.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    productLine_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};