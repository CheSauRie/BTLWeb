'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products',
      [
        {
          name: 'ROG 512',
          code: "GM512",
          productLine_id: "1",
          price: "1000",
          description: "Thông số",
          thumbail: "http://localhost:3001/public\image\product\1669968175888_rog.jpg",
          createdAt: "2022-12-02 08:33:30",
          updatedAt: "2022-12-02 08:33:30"
        },
        {
          name: 'ROG 531',
          code: "GM531",
          productLine_id: "1",
          price: "2000",
          description: "Thông số",
          thumbail: "http://localhost:3001/public\image\product\1669968175888_rog.jpg",
          createdAt: "2022-12-02 08:33:30",
          updatedAt: "2022-12-02 08:33:30"
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
