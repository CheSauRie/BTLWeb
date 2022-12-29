'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Products, Order }) {
      this.belongsTo(Products, { foreignKey: "product_id" })
      this.belongsTo(Order, { foreignKey: "order_id" })
    }
  }
  OrderDetails.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};