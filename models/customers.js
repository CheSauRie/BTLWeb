'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ProductHistory, Order, GiveBack }) {
      this.hasMany(ProductHistory, { foreignKey: "customer_id" })
      this.hasMany(Order, { foreignKey: "customer_id" })
      this.hasMany(GiveBack, { foreignKey: "customer_id" })
    }
  }
  Customers.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};