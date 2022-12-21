'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
      await queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    await queryInterface.bulkInsert('status',
      [{
        name: 'Mới sản xuất',
      },
      {
        name: 'Đang ở đại lý',
      },
      {
        name: 'Đã bán cho khách hàng',
      },
      {
        name: 'Lỗi cần bảo hành',
      },
      {
        name: 'Đang sửa chữa ở trung tâm bảo hành',
      },
      {
        name: 'Đã bảo hành xong',
      },
      {
        name: 'Đã trả lại cho khách hàng',
      },
      {
        name: 'Lỗi, cần trả về nhà máy',
      },
      {
        name: 'Lỗi, đưa về cơ sở sản xuất',
      },
      {
        name: 'Lỗi, cần triệu hồi',
      },
      {
        name: 'Hết thời gian bảo hành',
      },
      {
        name: 'Trả lại cơ sở sản xuất',
      },
      ],
      {});
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
