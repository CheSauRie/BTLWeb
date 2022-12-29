'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiveBackDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Products, GiveBack }) {
      this.belongsTo(Products, { foreignKey: "product_id" })
      this.belongsTo(GiveBack, { foreignKey: "giveback_id" })
    }
  }
  GiveBackDetail.init({
    product_id: DataTypes.INTEGER,
    giveback_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GiveBackDetail',
  });
  return GiveBackDetail;
};