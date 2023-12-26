'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeRoom_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TypeRoom_Image.init({
    caption: DataTypes.STRING,	
    typeRoomId: DataTypes.INTEGER,	
    image: DataTypes.BLOB('long')	
  }, {
    sequelize,
    modelName: 'TypeRoom_Image',
  });
  return TypeRoom_Image;
};