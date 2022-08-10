module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pentende'
    },
  },
  {
    createdAt: 'saleDate',
    updatedAt: false,
    underscored: true,
    tableName: 'sales',
    modelName: 'Sale'
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
    Sale.belongsTo(models.User, {
      as: 'seller',
      foreignKey: 'sellerId',
    });

    // Sale.associate = (models) => {
    //   Sale.hasMany(models.SaleProduct, { foreignKey: 'saleId', as: 'Sale' });
    // }

  };


  return Sale;
};