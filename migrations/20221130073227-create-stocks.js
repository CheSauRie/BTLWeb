'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      user_id: {
        references: {
          model: "users",
          key: "id"
        },
        type: Sequelize.INTEGER
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stocks');
  }
};