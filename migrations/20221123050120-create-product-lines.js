'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductLines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      status_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "status",
        //   key: "id"
        // }
      },
      warranty_time: {
        type: Sequelize.STRING
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductLines');
  }
};