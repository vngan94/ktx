'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Complaints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: Sequelize.INTEGER,		
      employeeId: Sequelize.INTEGER,		
      subject: Sequelize.STRING,		
      status: Sequelize.STRING,		
      complaintMarkdown: Sequelize.TEXT('long'),		
      complaintHTML: Sequelize.TEXT('long'),	
      responseMarkdown: Sequelize.TEXT('long'),	
      responseHTML: Sequelize.TEXT('long'),	
      createdAt: { allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Complaints');
  }
};