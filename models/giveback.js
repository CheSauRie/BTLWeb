'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiveBack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Customers, GiveBackDetail }) {
      this.belongsTo(Customers, { foreignKey: "customer_id" })
      this.hasMany(GiveBackDetail, { foreignKey: "giveback_id" })
    }
  }
  GiveBack.init({
    customer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GiveBack',
  });
  return GiveBack;
};