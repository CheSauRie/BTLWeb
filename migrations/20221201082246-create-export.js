'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      agent_id: {
        references: {
          model: "users",
          key: "id"
        },
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
    await queryInterface.dropTable('Exports');
  }
};