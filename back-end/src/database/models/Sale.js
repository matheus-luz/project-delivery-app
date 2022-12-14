module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(10,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pendente'
    },
    saleDate: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('saleDate')?.toLocaleString('pt-BR', {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        })
      }
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
  };


  return Sale;
};