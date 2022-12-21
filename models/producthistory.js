'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductHistory.init({
    agent_id: DataTypes.INTEGER,
    factory_id: DataTypes.INTEGER,
    service_center_id: DataTypes.INTEGER,
    place: DataTypes.STRING,
    status_id: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProductHistory',
  });
  return ProductHistory;
};