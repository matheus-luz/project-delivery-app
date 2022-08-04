module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sales', {
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
    underscored: true
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'userId',
    });
    Sale.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'sellerId',
    });
  };

  return Sale;
};