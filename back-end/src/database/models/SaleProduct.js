module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'salesProducts'
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'Sale',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'Product',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
  };

  return SaleProduct;
};