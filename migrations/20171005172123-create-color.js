'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('colors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      r: {
        type: Sequelize.INTEGER
      },
      g: {
        type: Sequelize.INTEGER
      },
      b: {
        type: Sequelize.INTEGER
      },
      hex: {
        type: Sequelize.STRING
      },
      c: {
        type: Sequelize.INTEGER
      },
      m: {
        type: Sequelize.INTEGER
      },
      y: {
        type: Sequelize.INTEGER
      },
      k: {
        type: Sequelize.INTEGER
      },
      spaceId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('colors');
  }
};