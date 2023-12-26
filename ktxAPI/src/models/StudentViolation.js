'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentViolation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentViolation.belongsTo(models.Violation_Action, { foreignKey: 'violationActionId', targetKey: 'id', as: 'violationActionData' })
      StudentViolation.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'studentData' })
    }
  }
  StudentViolation.init({
    violationActionId: DataTypes.INTEGER,	
    dateViolation: DataTypes.STRING,	
    note: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentViolation',
  });
  return StudentViolation;
};