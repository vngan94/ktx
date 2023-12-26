'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      userId:  Sequelize.INTEGER,	
      start: Sequelize.STRING,	
      end:  Sequelize.STRING,	
      isLast:  Sequelize.BOOLEAN,	
      amount: Sequelize.BIGINT,	
      status: Sequelize.STRING,	
      roomBedId:  Sequelize.INTEGER,
      createdAt: { allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contracts');
  }
};