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

        await queryInterface.bulkInsert('productlines',
            [{
                name: 'ROG TUF',
                description: "Laptop Gaming",
                status_id: 1,
                warranty_time: "2 thang",
                createdAt: "2022-12-22 05:15:05",
                updatedAt: "2022-12-22 05:15:05"
            },
            {
                name: 'DELL',
                description: "Laptop Van Phong",
                status_id: 1,
                warranty_time: "2 thang",
                createdAt: "2022-12-22 05:15:05",
                updatedAt: "2022-12-22 05:15:05"
            },
            {
                name: 'HP',
                description: "Laptop Gaming",
                status_id: 1,
                warranty_time: "2 thang",
                createdAt: "2022-12-22 05:15:05",
                updatedAt: "2022-12-22 05:15:05"
            },
            {
                name: 'MSI',
                description: "Laptop Gaming",
                status_id: 1,
                warranty_time: "2 thang",
                createdAt: "2022-12-22 05:15:05",
                updatedAt: "2022-12-22 05:15:05"
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
