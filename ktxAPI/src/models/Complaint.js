"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Complaint.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "studentData",
      });
      Complaint.belongsTo(models.User, {
        foreignKey: "employeeId",
        targetKey: "id",
        as: "employeeData",
      });
    }
  }
  Complaint.init(
    {
      userId: DataTypes.INTEGER,
      employeeId: DataTypes.INTEGER,
      subject: DataTypes.STRING,
      status: DataTypes.STRING,
      code: DataTypes.STRING,
      complaintHTML: DataTypes.STRING,

      responseHTML: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Complaint",
    }
  );
  return Complaint;
};
