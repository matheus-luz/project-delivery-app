module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    createdAt: 'saleDate',
    updatedAt: false,
    underscored: true,
    tableName: 'sales'
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      as: 'userClient',
      foreignKey: 'userId',
    });
    Sale.belongsTo(models.User, {
      as: 'userSeller',
      foreignKey: 'sellerId',
    });
  };

  return Sale;
};