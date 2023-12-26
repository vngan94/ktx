"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Code, {
        foreignKey: "roleId",
        targetKey: "code",
        as: "roleData",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      dob: DataTypes.STRING,
      isLeader: DataTypes.BOOLEAN,
      roleId: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.BLOB("long"),

      class: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
