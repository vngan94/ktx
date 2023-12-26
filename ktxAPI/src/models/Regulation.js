"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Regulation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Regulation.init(
    {
      regulationName: DataTypes.STRING,
      link: DataTypes.STRING,
      caption: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      contentMarkdown: DataTypes.TEXT("long"),
      contentHTML: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Regulation",
    }
  );
  return Regulation;
};
