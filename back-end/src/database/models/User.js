const md5 = require('md5');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) { this.setDataValue('password', md5(value)) }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    }
  },
  {
    timestamps: false,
    tableName: 'users',
    modelName: 'User'
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: 'userId', as: 'sales' });
    User.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'seller' });
  }

  return User;
};