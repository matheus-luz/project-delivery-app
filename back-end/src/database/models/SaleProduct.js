module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('salesProducts', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'salesProducts',
    modelName: 'SaleProduct'
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Sale, {
      as: 'Sale',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });
    models.Product.belongsToMany(models.Product, {
      as: 'Product',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
  };

  return SaleProduct;
};