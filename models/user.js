'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stocks, ProductHistory, warranty, Export }) {
      this.hasMany(Stocks, { foreignKey: "user_id" })
      this.hasMany(ProductHistory, { foreignKey: "agent_id" })
      this.hasMany(ProductHistory, { foreignKey: "factory_id" })
      this.hasMany(ProductHistory, { foreignKey: "service_center_id" })
      this.hasMany(warranty, { foreignKey: "agent_id" })
      this.hasMany(warranty, { foreignKey: "service_center_id" })
      this.hasMany(Export, { foreignKey: "agent_id" })
    }
  }
  User.init({
    code: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};