'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Register extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Register.belongsTo(models.Room, { foreignKey: 'roomId', targetKey: 'id', as: 'roomData' })
      Register.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'studentData' })
    }
  }
  Register.init({
    userId: DataTypes.INTEGER,	
    roomId: DataTypes.INTEGER,		
    status: DataTypes.STRING,	
  }, {
    sequelize,
    modelName: 'Register',
  });
  return Register;
};