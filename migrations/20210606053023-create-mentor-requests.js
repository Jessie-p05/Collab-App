'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mentor_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
            model: "users",
            key: 'id'
        }
      },
      ProjectId: {
        type: Sequelize.INTEGER,
        references: {
            model: "projects",
            key: 'id'
        }
      },
      message: {
        type: Sequelize.STRING
      },
      datePosted: {
        type: Sequelize.DATE
      },
      accepted: {
        type: Sequelize.BOOLEAN
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mentor_requests');
  }
};