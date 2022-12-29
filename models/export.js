'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Export extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, ExportDetail }) {
      this.belongsTo(User, { foreignKey: "agent_id" })
      this.hasMany(ExportDetail, { foreignKey: "export_id" })
    }
  }
  Export.init({
    agent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Export',
  });
  return Export;
};