'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Import extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stocks, ImportDetails }) {
      this.belongsTo(Stocks, { foreignKey: "stock_id" })
      this.hasMany(ImportDetails, { foreignKey: "import_id" })
    }
  }
  Import.init({
    stock_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Import',
  });
  return Import;
};