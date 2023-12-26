'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Room_Beds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomId: Sequelize.INTEGER,
      bedId: Sequelize.STRING,
      statusStudent: Sequelize.STRING,
      statusRoomBed: Sequelize.BOOLEAN,
      userId: Sequelize.INTEGER,
      isLast: Sequelize.BOOLEAN,
      createdAt: { allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Room_Beds');
  }
};