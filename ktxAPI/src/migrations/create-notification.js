'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagId:  Sequelize.STRING,	
      shortDescription: Sequelize.STRING,	
      title: Sequelize.STRING,	
      image: Sequelize.BLOB('long'),	
      contentMarkdown: Sequelize.TEXT('long'),	
      contentHTML: Sequelize.TEXT('long'),	
      createdAt: { allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};