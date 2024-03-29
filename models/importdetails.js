'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImportDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Import, Products }) {
      this.belongsTo(Import, { foreignKey: "import_id" })
      this.belongsTo(Products, { foreignKey: "product_id" })
    }
  }
  ImportDetails.init({
    product_id: DataTypes.INTEGER,
    import_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ImportDetails',
  });
  return ImportDetails;
};