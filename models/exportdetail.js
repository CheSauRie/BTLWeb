'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExportDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Export, Products }) {
      this.belongsTo(Export, { foreignKey: "export_id" })
      this.belongsTo(Products, { foreignKey: "product_id" })
    }
  }
  ExportDetail.init({
    product_id: DataTypes.INTEGER,
    export_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExportDetail',
  });
  return ExportDetail;
};