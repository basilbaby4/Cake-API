'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cake_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cake_master.init({
    name: DataTypes.STRING,
    comment: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    yumFactor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cake_master',
  });
  return cake_master;
};