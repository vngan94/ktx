'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FAQs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      question:  Sequelize.STRING,	
      answer:  Sequelize.STRING,	
      userId: Sequelize.INTEGER	,
      createdAt: { allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FAQs');
  }
};