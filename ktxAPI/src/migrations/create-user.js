'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: Sequelize.STRING,	
      password: Sequelize.STRING,	
      fullName: Sequelize.STRING,		
      address: Sequelize.STRING,	
      gender: Sequelize.STRING,	
      phonenumber: Sequelize.STRING,	
      dob: Sequelize.STRING,	
      isLeader: Sequelize.BOOLEAN,	
      roleId: Sequelize.STRING,	
      status: Sequelize.STRING,	
      usertoken: Sequelize.STRING,
      image: Sequelize.BLOB('long'),		
      idenBefore: Sequelize.BLOB('long'),	
      idenAfter: Sequelize.BLOB('long'),	
      class: Sequelize.STRING,	
      code: Sequelize.STRING,	
      identification:  Sequelize.STRING,

      createdAt: { allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};