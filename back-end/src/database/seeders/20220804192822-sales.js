'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales',
    [
      {
        user_id: 3,
        seller_id: 2,
        total_price: 15.0,
        delivery_address: "Rua Liberdade",
        delivery_number: "19",
        sale_date: new Date('2022-07-01T19:58:00.000Z'),
        status: "Em Trânsito"
      },
      {
        user_id: 3,
        seller_id: 2,
        total_price: 9.7,
        delivery_address: "Rua Alfeneiros",
        delivery_number: "14",
        sale_date: new Date('2022-06-01T19:58:00.000Z'),
        status: "Entregue"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
