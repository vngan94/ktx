"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contract.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "studentData",
      });
      Contract.belongsTo(models.Room_Bed, {
        foreignKey: "roomBedId",
        targetKey: "id",
        as: "roombedData",
      });
    }
  }
  Contract.init(
    {
      userId: DataTypes.INTEGER,
      start: DataTypes.STRING,
      end: DataTypes.STRING,
      amount: DataTypes.BIGINT,
      status: DataTypes.STRING,
      roomBedId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Contract",
    }
  );
  return Contract;
};
