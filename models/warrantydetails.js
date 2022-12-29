'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarrantyDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ warranty, Products }) {
      this.belongsTo(warranty, { foreignKey: "warranty_id" })
      this.belongsTo(Products, { foreignKey: "product_id" })
    }
  }
  WarrantyDetails.init({
    warranty_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status_warranty: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WarrantyDetails',
  });
  return WarrantyDetails;
};