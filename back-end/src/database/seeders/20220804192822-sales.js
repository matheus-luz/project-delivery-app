'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales',
    [
      {
        userId: 3,
        sellerId: 2,
        totalPrice: 15.0,
        deliveryAddress: "Rua Liberdade",
        deliveryNumber: "19",
        saleDate: new Date('2022-07-01T19:58:00.000Z'),
        status: "Em Trânsito"
      },
      {
        userId: 3,
        sellerId: 2,
        totalPrice: 9.7,
        deliveryAddress: "Rua Alfeneiros",
        deliveryNumber: "14",
        saleDate: new Date('2022-06-01T19:58:00.000Z'),
        status: "Entregue"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
