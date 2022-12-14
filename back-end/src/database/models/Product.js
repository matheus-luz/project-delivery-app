module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    urlImage: DataTypes.STRING
  },
  {
    timestamps: false,
    underscored: true,
    modelName: 'Product',
    tableName: 'products',
  });

  return Product;
};