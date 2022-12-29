'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warranty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, WarrantyDetails }) {
      this.belongsTo(User, { foreignKey: "agent_id" })
      this.belongsTo(User, { foreignKey: "service_center_id" })
      this.hasMany(WarrantyDetails, { foreignKey: "warranty_id" })
    }
  }
  warranty.init({
    service_center_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'warranty',
  });
  return warranty;
};