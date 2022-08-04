'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salesProducts',
    [
      {
        sale_id: 1,
        product_id:2,
        quantity: 1
      },
      {
        sale_id: 1,
        product_id:4,
        quantity: 1
      },
      {
        sale_id: 2,
        product_id: 1,
        quantity: 1
      },
      {
        sale_id: 2,
        product_id:2,
        quantity: 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salesProducts', null, {});
  }
};