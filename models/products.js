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
    static associate({ ProductLines, ImportDetails, ExportDetail, WarrantyDetails, OrderDetails, GiveBackDetail, ProductHistory }) {
      this.belongsTo(ProductLines, { foreignKey: "productLine_id" })
      this.hasMany(ImportDetails, { foreignKey: "product_id" })
      this.hasMany(ExportDetail, { foreignKey: "product_id" })
      this.hasMany(WarrantyDetails, { foreignKey: "product_id" })
      this.hasMany(OrderDetails, { foreignKey: "product_id" })
      this.hasMany(GiveBackDetail, { foreignKey: "product_id" })
      this.hasMany(ProductHistory, { foreignKey: "product_id" })
    }
  }
  Products.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    productline_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};