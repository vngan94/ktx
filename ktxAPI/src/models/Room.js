'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Area, { foreignKey: 'areaId', targetKey: 'id', as: 'areaData' })
      Room.belongsTo(models.TypeRoom, { foreignKey: 'typeRoomId', targetKey: 'id', as: 'typeroomData' })
    }
  }
  Room.init({
    areaId: DataTypes.INTEGER,	
    typeRoomId: DataTypes.INTEGER,	
    roomName: DataTypes.STRING,
    status: DataTypes.STRING	
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};