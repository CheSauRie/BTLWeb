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
    static associate({ User, Import }) {
      this.belongsTo(User, { foreignKey: "user_id" })
      this.hasMany(Import, { foreignKey: "stock_id" })
    }
  }
  Stocks.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stocks',
  });
  return Stocks;
};