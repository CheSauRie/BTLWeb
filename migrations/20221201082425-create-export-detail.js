'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExportDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        references: {
          model: "products",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      export_id: {
        references: {
          model: "exports",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {

        type: Sequelize.DATE
      },
      updatedAt: {

        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExportDetails');
  }
};