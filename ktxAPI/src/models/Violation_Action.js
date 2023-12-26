'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Violation_Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Violation_Action.belongsTo(models.Code, { foreignKey: 'violationId', targetKey: 'code', as: 'violationData' }),
      Violation_Action.belongsTo(models.Code, { foreignKey: 'actionId', targetKey: 'code', as: 'actionData' })
      
    }
  }
  Violation_Action.init({
    violationId: DataTypes.STRING,	
    times: DataTypes.INTEGER,	
    actionId:  DataTypes.STRING,	
    status: DataTypes.STRING,	
    note: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Violation_Action',
  });
  return Violation_Action;
};