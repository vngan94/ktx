'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class  Room_Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room_Device.belongsTo(models.Room, { foreignKey: 'roomId', targetKey: 'id', as: 'roomData' })
      Room_Device.belongsTo(models.Device, { foreignKey: 'deviceId', targetKey: 'id', as: 'deviceData' })
      Room_Device.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'employeeData' })
    }
  }
  Room_Device.init({
    status:  DataTypes.INTEGER,	
    roomId:  DataTypes.INTEGER,	
    deviceId:   DataTypes.INTEGER,	
    userId: DataTypes.INTEGER	
  }, {
    sequelize,
    modelName: 'Room_Device',
  });
  return Room_Device;
};