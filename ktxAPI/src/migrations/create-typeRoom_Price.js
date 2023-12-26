'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TypeRoom_Prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeRoomId:  Sequelize.INTEGER,	
      priceSerivce: Sequelize.BIGINT,	
      priceTypeRoom: Sequelize.BIGINT,	
      isLast: Sequelize.BOOLEAN,	
      startAt: Sequelize.STRING,	
      EndAt: Sequelize.STRING,
      createdAt: { allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TypeRoom_Prices');
  }
};