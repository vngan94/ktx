'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeRoom_Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TypeRoom_Price.init({
    typeRoomId:  DataTypes.INTEGER,	
    priceService: DataTypes.BIGINT,	
    priceTypeRoom: DataTypes.BIGINT,	
    isLast: DataTypes.BOOLEAN,	
    startAt: DataTypes.STRING,	
    endAt: DataTypes.STRING	
  }, {
    sequelize,
    modelName: 'TypeRoom_Price',
  });
  return TypeRoom_Price;
};