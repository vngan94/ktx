'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentViolations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      violationActionId: Sequelize.INTEGER,	
      userId: Sequelize.INTEGER,	
      dateViolation: Sequelize.STRING,	
      note: Sequelize.STRING,
      createdAt: { allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentViolations');
  }
};