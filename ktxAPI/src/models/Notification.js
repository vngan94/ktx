'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.Code, { foreignKey: 'tagId', targetKey: 'code', as: 'tagData' })
    }
  }
  Notification.init({
    tagId:  DataTypes.STRING,	
    shortDescription: DataTypes.STRING,	
    title: DataTypes.STRING,	
    image: DataTypes.BLOB('long'),	
    contentMarkdown: DataTypes.TEXT('long'),	
    contentHTML: DataTypes.TEXT('long'),	
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};