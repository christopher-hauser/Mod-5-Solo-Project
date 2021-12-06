'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users'}
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      pricePerNight: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      beds: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amenities: {
        type: Sequelize.STRING(300)
      },
      rating: {
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
    return queryInterface.dropTable('Spots');
  }
};
