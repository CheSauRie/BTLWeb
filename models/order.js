'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderDetails, Customers }) {
      this.belongsTo(Customers, { foreignKey: "customer_id" })
      this.hasMany(OrderDetails, { foreignKey: "order_id" })
    }
  }
  Order.init({
    customer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};