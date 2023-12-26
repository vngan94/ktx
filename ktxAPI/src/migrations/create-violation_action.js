'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Violation_Actions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      violationId: Sequelize.STRING,	
      times: Sequelize.INTEGER,	
      actionId:  Sequelize.STRING,	
      status: Sequelize.STRING,	
      note: Sequelize.STRING,
      createdAt: { allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Violation_Actions');
  }
};