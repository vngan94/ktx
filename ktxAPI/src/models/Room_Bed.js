"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room_Bed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room_Bed.belongsTo(models.Code, {
        foreignKey: "bedId",
        targetKey: "code",
        as: "bedData",
      });
      Room_Bed.belongsTo(models.Room, {
        foreignKey: "roomId",
        targetKey: "id",
        as: "roomData",
      });
      Room_Bed.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "studentData",
      });
    }
  }
  Room_Bed.init(
    {
      roomId: DataTypes.INTEGER,
      bedId: DataTypes.STRING,
      statusStudent: DataTypes.STRING,
      statusRoomBed: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      isLast: DataTypes.BOOLEAN,
      dateCheckIn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Room_Bed",
    }
  );
  return Room_Bed;
};
