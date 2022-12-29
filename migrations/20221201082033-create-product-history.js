'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductHistories', {
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
      factory_id: {
        references: {
          model: "users",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      service_center_id: {
        references: {
          model: "users",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      place: {
        type: Sequelize.STRING
      },
      product_id: {
        references: {
          model: "products",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      customer_id: {
        references: {
          model: "customers",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {

        type: Sequelize.DATE
      },
      updatedAt: {

        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductHistories');
  }
};